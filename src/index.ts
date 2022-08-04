import express, { Application } from "express";
import dotenv from "dotenv";

const app: Application = express();
dotenv.config();
app.listen(process.env.PORT, () =>
  console.log(`The Server Is Running At Port ${process.env.PORT}`)
);
