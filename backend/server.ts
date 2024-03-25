import dotenv from "dotenv";
const mongoose = require("mongoose");
import express, { Express, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware.ts");
const cookieParser = require("cookie-parser");
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
    await mongoose.connect(process.env.MONGO_DB_URI);

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

// TODO Verify  connection

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("SOCKET CONNECTED");
});

httpServer.listen(port as number, () => {
  console.log("****** HTTP server listening on port:", port, "******");
});
