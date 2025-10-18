import fxData from "../utils/data/sample.json" assert { type: "json" };
import { simulateFXPath } from "../utils/simulation.utils.js";
import { calculateMidMarketRate } from "../utils/functions.utils.js";

export const createSimulation = async (req, res, next) => {
  try {
    const { buyCurrency, sellCurrency, sellAmount, amount, frequency, type } =
      req.body;

    const midMarketData = fxData.quotes.map((quote) => [
      quote.date,
      calculateMidMarketRate(quote),
    ]);

    const simulation = simulateFXPath(midMarketData);

    res.status(201).json({
      success: true,
      message: "Simulation created successfully",
      data: simulation,
    });
  } catch (error) {
    next(error);
  }
};
