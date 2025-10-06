import express from "express";
import { WebSocketServer } from "ws";
import { startTikTokHandler } from "./tiktokHandler.js";

const app = express();
const PORT = 3001;


const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws) => {
  console.log("💬 Client connected");
  ws.on("close", () => console.log("❌ Client disconnected"));
});

startTikTokHandler(wss, "the.null.object");
