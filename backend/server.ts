import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: Number = 3000;

app.use("/api", require("./routes/testRoutes"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to the ChatFace API.");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
