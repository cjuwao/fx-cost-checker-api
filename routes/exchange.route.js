import { Router } from "express";

import { createExchange } from "../controllers/exchange.controller.js";

const exchangeRouter = Router();

exchangeRouter.post("/create", createExchange);
exchangeRouter.get("/exchange", (req, res) => {
  res.send("Exchange");
});

export default exchangeRouter;
