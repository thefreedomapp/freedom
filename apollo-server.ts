import {
	ApolloServerBase,
	convertNodeHttpToRequest,
	runHttpQuery,
	ApolloServerPluginDrainHttpServer
} from "apollo-server-core";
import schema from "./src/routes/graphql";
import { URLSearchParams } from "node:url";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { Connect } from "vite";
import type { Server } from "node:http";

export default async function handleServer(server: Connect.Server, httpServer: Server) {
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: "/graphql"
	});

	const serverCleanup = useServer({ schema }, wsServer);

	const apollo = new ApolloServerBase({
		schema,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),

			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						}
					};
				}
			}
		]
	});

	await apollo.start();
	server.use("/graphql", async (req, res, next) => {
		if (!["POST", "GET"].includes(req.method!)) {
			return next();
		}

		let query = req.url!.split("?")[1];

		// if they want the landing page
		if (
			req.method === "GET" &&
			(req.headers["accept"]?.split(",").includes("text/html") || query === undefined)
		) {
			// @ts-ignore
			res.end(apollo.getLandingPage()!.html);
			return;
		}

		let postBody = await new Promise<string>((resolve, reject) => {
			let body = "";
			req
				.on("data", (chunk) => {
					body += chunk;
				})
				.on("end", () => {
					resolve(body);
				})
				.on("error", reject);
		});

		let params: URLSearchParams | undefined;
		if (req.method === "GET") {
			if (query !== undefined) {
				params = new URLSearchParams(query);
			}
		}

		try {
			let { graphqlResponse, responseInit } = await runHttpQuery([], {
				method: req.method!,
				// @ts-ignore
				options: apollo.graphQLServerOptions({ req, res }),
				query: req.method === "POST" ? JSON.parse(postBody) : params,
				request: convertNodeHttpToRequest(req)
			});

			res.statusCode = responseInit.status || 200;

			if (responseInit.headers) {
				for (const [name, value] of Object.entries(responseInit.headers)) {
					res.setHeader(name, value);
				}
			}

			res.end(graphqlResponse);
		} catch (e) {
			console.error(e);
			res.end(e.toString());
		}
	});
}
