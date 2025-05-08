import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import cookieParser from "cookie-parser";
import { chatEvents } from "./events/chatEvents.js";
import { userEvents } from "./events/userEvent.js";

const app = express();
const server = http.createServer(app);
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});




io.on("connection", (socket) => {
  console.log("✅ Connected to socket server:", socket.id);  

  chatEvents(io, socket);
  userEvents(io, socket);
});


export {io}

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

server.listen(process.env.PORT, () => console.log("Server started"));
