import express, { Application } from "express";
import dotenv from "dotenv";
import UserRouter from "./users/users.routes";

const app: Application = express();
dotenv.config();

app.use(express.json());
app.use("/api/users", UserRouter);

app.listen(process.env.PORT, () =>
  console.log(`The Server Is Running At Port ${process.env.PORT}`)
);
