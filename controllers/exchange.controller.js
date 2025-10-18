import { getMinuteHistoricalData } from "../utils/traderMade.utils.js";
import { getPriceAtTime } from "../utils/twelveData.utils.js";
import { calculateMidMarketRate } from "../utils/functions.utils.js";
import Exchange from "../models/exchange.model.js";

export const createExchange = async (req, res, next) => {
  try {
    const {
      buyCurrency,
      sellCurrency,
      buyAmount,
      sellAmount,
      date_time,
      fxRequirement,
    } = req.body;
    // const minuteHistoricalData = await getMinuteHistoricalData(
    //   buyCurrency,
    //   sellCurrency,
    //   date_time
    // );
    const minuteHistoricalData = await getPriceAtTime(
      buyCurrency,
      sellCurrency,
      date_time
    );

    console.log(minuteHistoricalData);

    if (!minuteHistoricalData) {
      const error = new Error("Failed to fetch minute historical data");
      error.statusCode = 500;
      throw error;
    }

    // Calculate mid-market rate
    const quote = {
      high: minuteHistoricalData.high,
      low: minuteHistoricalData.low,
      open: minuteHistoricalData.open,
      close: minuteHistoricalData.close,
    };
    const midMarketRate = calculateMidMarketRate(quote);

    // Calculate the provider's effective rate
    const providerRate = Number(buyAmount) / Number(sellAmount);

    // Calculate profit:
    // Fair amount should be sellAmount * midMarketRate,
    // so profit is the difference between fair value and what was actually received.
    const fairAmount = Number(sellAmount) * midMarketRate;
    const profitAmount = fairAmount - Number(buyAmount);
    // Alternatively, profit can be calculated as:
    // (midMarketRate - providerRate) * Number(sellAmount)

    // Calculate profit percentage relative to the fair value
    const profitPercentage = (profitAmount / fairAmount) * 100;

    // Assuming no markup, the FX saving equals the profit.
    const exchangeSaving = profitAmount;

    // Adjust annualSaving based on fxRequirement as a percentage factor, if provided.
    const annualSaving = (profitAmount * Number(fxRequirement || 0)) / 100;

    const exchange = await Exchange.create({
      ...req.body,
      midMarketRate,
      providerRate,
      profitPercentage,
      profitAmount,
      exchangeSaving,
      annualSaving,
    });

    await exchange.save();

    res.status(201).json({
      success: true,
      message: "Exchange created successfully",
      data: exchange,
    });
  } catch (error) {
    next(error);
  }
};
