import fxData from "../utils/data/sample.json" assert { type: "json" };
import { simulateFXPath } from "../utils/simulation.utils.js";
import { calculateMidMarketRate } from "../utils/functions.utils.js";
import { getDailyRatesForPastYear } from "../utils/twelveData.utils.js";
export const createSimulation = async (req, res, next) => {
  try {
    const { buyCurrency, sellCurrency, sellAmount, amount, frequency, type } =
      req.body;
    const dailyRates = await getDailyRatesForPastYear(
      buyCurrency,
      sellCurrency
    );
    const midMarketData = fxData.quotes.map((quote) => [
      quote.date,
      calculateMidMarketRate(quote),
    ]);
    const dailyRatesData = dailyRates.map((quote) => {
      const numericQuote = {
        open: Number(quote.open),
        high: Number(quote.high),
        low: Number(quote.low),
        close: Number(quote.close),
      };
      return [
        quote.datetime,
        Number(calculateMidMarketRate(numericQuote).toFixed(4)),
      ];
    });
    const simulation = simulateFXPath(dailyRatesData);
    const result = {
      historical: dailyRatesData,
      simulation: simulation,
    };

    res.status(201).json({
      success: true,
      message: "Simulation created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
