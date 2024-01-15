import express, { Request, Response } from "express";
import authFacebook from "./routes/authFacebook";

const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Hello world").end();
});
app.get("/login", (req: Request, res: Response) => {
  return res.status(200).send("login route").end();
});

app.use("/api", authFacebook);

app.listen(5555, () => {
  console.log("server running...");
});
