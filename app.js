import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.route.js";
import exchangeRouter from "./routes/exchange.route.js";
import simulationRouter from "./routes/simulation.route.js";

import errorMiddleware from "./middlewares/error.middleware.js";

import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/exchange", exchangeRouter);
app.use("/api/v1/simulation", simulationRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/exchange", exchangeRouter);
app.use("/api/v1/simulation", simulationRouter);

app.listen(PORT, async () => {
  console.log(
    `FX Cost Checker API is running on port http://localhost:${PORT}`
  );
  await connectToDatabase();
});
