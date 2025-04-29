import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({
  clientTracking: false,
  noServer: true,
});

wsServer.on("connection", (ws, request) => {
  console.log("wss: connection");

  ws.on("message", (data) => {
    console.log("ws: message: " + data);
    ws.send("Server: " + data);
  });

  ws.on("error", (error) => {
    console.error("ws: error: " + error);
  });

  ws.on("close", () => {
    console.log("ws: closed");
  });
});

export default wsServer;
