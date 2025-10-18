import { Router } from "express";

import { createSimulation } from "../controllers/simulation.controller.js";

const simulationRouter = Router();

simulationRouter.post("/create", createSimulation);
simulationRouter.get("/simulation", (req, res) => {
  res.send("Simulation");
});

export default simulationRouter;
