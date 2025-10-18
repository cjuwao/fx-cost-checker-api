import axios from "axios";
import { TWELVE_DATA_API_KEY, TWELVE_DATA_URL } from "../config/env.js";
import dayjs from "dayjs";

export const getPriceAtTime = async (sellCurrency, buyCurrency, date_time) => {
  const currency = `${buyCurrency}/${sellCurrency}`;
  const startDate = date_time;
  const endDate = dayjs(date_time)
    .add(59, "second")
    .format("YYYY-MM-DD HH:mm:ss.SS");

  const url = `${TWELVE_DATA_URL}?symbol=${encodeURIComponent(
    currency
  )}&interval=1min&start_date=${encodeURIComponent(
    startDate
  )}&end_date=${encodeURIComponent(endDate)}&apikey=${TWELVE_DATA_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const candle = data.values.find((v) => v.datetime === date_time);

    if (!candle) {
      throw new Error("No exact match for the provided timestamp.");
    }

    return {
      currency: `${currency}`,
      date_time: date_time,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      request_time: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching price at time:", error.message);
    return null;
  }
};
