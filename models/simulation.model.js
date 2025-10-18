import mongoose from "mongoose";

const SimulationSchema = new mongoose.Schema(
  {
    buyCurrency: {
      type: String,
      required: true,
    },
    sellCurrency: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Simulation = mongoose.model("Simulation", SimulationSchema);

export default Simulation;
