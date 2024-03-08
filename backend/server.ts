import dotenv from "dotenv";
const mongoose = require("mongoose");
import express, { Express, Request, Response } from "express";
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware.ts");

const app: Express = express();
const port: Number = 3000;

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

app.use(cors());

// Allows us to parse json req body.
app.use(express.json());
// Allows us to parse urlencoded req body.
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/test/", require("./routes/testRoutes"));
app.use("/api/user/", require("./routes/userRoutes"));

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to the ChatFace API.");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
