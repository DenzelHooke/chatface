import express, { Express, Request, Response } from "express";
const cors = require('cors');


const app: Express = express();
const port: Number = 3000;

app.use(cors())
app.use("/api/auth/", require("./routes/authRoutes"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to the ChatFace API.");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
