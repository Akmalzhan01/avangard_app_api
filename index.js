import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routers/auth.route.js";
import userRouter from "./routers/user.route.js";

// constants
const app = express();
dotenv.config();

// middlware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// router
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// mongoose connection
async function start() {
  try {
    mongoose
      .connect(
        `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PASS}@cluster0.wjuhzc7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      )
      .then((success) =>
        app.listen(
          process.env.PORT,
          console.log(`Mongoose connected on port ${process.env.PORT}`)
        )
      )
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}
start();
