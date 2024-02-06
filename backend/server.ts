import express, { Express, Request, Response } from "express";
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware.ts");
// const http = require('http')

const app: Express = express();
const port: Number = 3000;

app.use(cors());

// Allows us to parse json req body.
app.use(express.json());
// Allows us to parse urlencoded req body.
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/test/", require("./routes/testRoutes"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to the ChatFace API.");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
