import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Express, Request, Response } from "express";
import { Server } from "socket.io";
import { METHODS, createServer } from "http";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import {
  findRoom,
  findUser,
  getAllMessages,
  saveMessage,
  verifyJwt,
} from "./helpers/helpers";
import { MessageData, RoomData } from "./types/types";
import { Socket } from "socket.io";

const app: Express = express();
const port: Number = 80;
const origins = ["http://localhost:5173", "http://192.168.1.95:5173"];

const corsOptions = {
  origin: origins,
  credentials: true,
};

const connectDB = async () => {
  try {
    const valid = dotenv.config();

    if (!valid) {
      throw new Error();
    }
    await mongoose.connect(process.env.MONGO_DB_URI as string);

    console.log(`Connected to Mongo cluster: ${mongoose.connection.host}`);
  } catch (error) {
    console.log("Failed to connect to Mongo DB cluster", error);
    process.exit(1);
  }
};

connectDB();
app.use(cors(corsOptions));
app.use(cookieParser());
// Allows us to parse json req body.
app.use(express.json());
// Allows us to parse urlencoded req body.
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/test/", require("./routes/testRoutes"));
app.use("/api/user/", require("./routes/userRoutes"));
app.use("/api/friends/", require("./routes/friendsRoutes"));
app.use("/api/room/", require("./routes/roomRoutes"));

app.use(errorHandler);

const server = app.listen(3000, "0.0.0.0", () => {
  console.log(`Running on port ${port}`);
});

// const httpServer = createServer(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to the ChatFace API.");
});

const socketDisconnect = (socket: Socket, reason: string) => {
  socket.disconnect();
  console.error(reason);
  console.error("Disconnected socket");
};

// TODO Verify  connection

export const io = new Server(server, {
  cors: {
    origin: origins,
    // origin: "*",
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  console.log("SOCKET CONNECTED");
  const userToken = verifyJwt(socket.handshake.auth.token);
  if (!userToken) {
    socketDisconnect(
      socket,
      "Invalid Jwt while attempting to connect socket to server!"
    );
    return;
  }

  if (!socket.handshake.query) {
    socketDisconnect(socket, "No query attached to socket connection!");
    return;
  }

  // Find room ID based on user ID and recipient ID
  try {
    const roomData = await findRoom(
      userToken.user,
      socket.handshake.query.recipient as string
    );

    const user = await findUser(userToken.user);

    if (!roomData) {
      throw new Error("No room data present");
    }

    socket.emit("init", {
      userID: userToken.user,
      messages: await getAllMessages(roomData.roomID),
    });

    if (!user) {
      socketDisconnect(socket, "No valid user found with token");
      return;
    }

    // Join socket to the room namespace
    socket.join(roomData.roomID as string);

    socket.on("isTyping", async (data: { userID: string }) => {
      socket.to(roomData.roomID as string).emit("isTyping", {
        userID: data.userID,
      } as { userID: string });
    });

    // Listen for chat messages
    socket.on("chatMessage", async (data: MessageData) => {
      // Broadcast the chat message to all clients in the room

      // TODO Save message with timestamp in database
      saveMessage(data, user, roomData.roomID);
      io.to(roomData?.roomID as string).emit("chatMessage", {
        username: user.username,
        userID: userToken.user,
        message: data.message,
      } as MessageData);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
