import express, { Application } from "express";
import dotenv from "dotenv";
import UserRouter from "./users/users.routes";
import BlogRouter from "./blogs/blogs.routes";
import CommentRouter from "./comments/comments.routes";

const app: Application = express();
dotenv.config();

app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/blogs", BlogRouter);
app.use("/api/comments", CommentRouter);

app.listen(process.env.PORT, () =>
  console.log(`The Server Is Running At Port ${process.env.PORT}`)
);
