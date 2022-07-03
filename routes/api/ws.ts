import type { HandlerContext } from "$fresh/server.ts";

// websocket handler.
// on message, respond with the same message.
export const handler = (req: Request, _ctx: HandlerContext): Response => {
    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.onmessage = (e) => {
        console.log("message:", e.data);
        socket.send(e.data);
    };
    socket.onclose = () => console.log("WebSocket has been closed.");
    socket.onerror = (e) => console.error("WebSocket error:", e);
    return response;
};
