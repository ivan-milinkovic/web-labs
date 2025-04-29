import express from "express";
import wsServer from "./websocket.js";
import path from "node:path";
import { fileURLToPath } from "url";
import { createServer } from "node:http";
const thisFileUrl = import.meta.url;
const __filename = fileURLToPath(thisFileUrl);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

const server = createServer(app);

// https://github.com/websockets/ws/blob/aa998e38c5f62844eb2fb1ccccb69a9c953ccd4f/examples/express-session-parse/index.js

server.on("upgrade", (request, socket, head) => {
  console.log("Websocket upgrade");
  wsServer.handleUpgrade(request, socket, head, function (ws) {
    console.log("Emitting connection event");
    wsServer.emit("connection", ws, request);
  });
});

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
