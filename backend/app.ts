import express from "express";
import { createServer } from "node:http";
import { Server as SocketServer } from "socket.io";
import next from "next";

const dev =
    process.env.NODE_ENV !== "production" ||
    !process.argv.includes("production");

const port = parseInt(process.env.PORT || "3000", 10);

const app = express();

const server = createServer(app);

const io = new SocketServer(server);

// FIXME(@TheBotlyNoob) - remove this once we upgrade to next.js v12.1.7
process.env.__NEXT_REACT_ROOT = "true";
const nextApp = next({
    dev,
    dir: "../frontend"
});

nextApp.prepare().then(() => {
    app.get("*", (req, res) => {
        nextApp.getRequestHandler()(req, res);
    });
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello World!" });
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
