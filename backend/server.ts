import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Express, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import { findRoom, findUser, verifyJwt } from "./helpers/helpers";
import { MessageData, RoomData } from "./types/types";
import { Socket } from "socket.io";

const app: Express = express();
const port: Number = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const connectDB = async () => {
  try {
    const valid = dotenv.config();

    if (!valid) {
      console.log(valid);
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

// const server = app.listen(port, () => {
//   console.log(`Running on port ${port}`);
// });

const httpServer = createServer(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to the ChatFace API.");
});

const socketDisconnect = (socket: Socket, reason: string) => {
  socket.disconnect();
  console.error(reason);
  console.error("Disconnected socket");
};

// TODO Verify  connection

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
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

  socket.emit("init", {
    userID: userToken.user,
  });

  // Find room ID based on user ID and recipient ID
  try {
    const roomData = await findRoom(
      userToken.user,
      socket.handshake.query.recipient as string
    );

    const user = await findUser(userToken.user);
    console.log(user);

    if (!user) {
      socketDisconnect(socket, "No valid user found with token");
      return;
    }

    // Join socket to the room namespace
    socket.join(roomData?.roomID as string);

    // Listen for chat messages
    socket.on("chatMessage", async (data: MessageData) => {
      // Broadcast the chat message to all clients in the room
      io.to(roomData?.roomID as string).emit("chatMessage", {
        username: user.username,
        userID: userToken.user,
        message: data.message,
      } as MessageData);
    });
  } catch (error) {
    console.error("Error:", error);
    // Handle any errors that occur during room lookup or socket join
    // You may want to emit an error event to the client or perform other error handling tasks
  }
});

httpServer.listen(port as number, () => {
  console.log("****** HTTP server listening on port:", port, "******");
});
