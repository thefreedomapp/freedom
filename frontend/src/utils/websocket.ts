async function createWebSocket(url: string): Promise<WebSocket> {
    const ws = new WebSocket(
        url.startsWith("ws")
            ? url
            : `${window.location.protocol === "https:" ? "wss" : "ws"}://${
                  window.location.host
              }${url.startsWith("/") ? url : `/${url}`}`
    );

    await new Promise<void>((res) => ws.addEventListener("open", () => res()));

    return ws;
}

export default createWebSocket;
