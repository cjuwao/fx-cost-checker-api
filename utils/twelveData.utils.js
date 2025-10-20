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
      open: Number(candle.open),
      high: Number(candle.high),
      low: Number(candle.low),
      close: Number(candle.close),
      request_time: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching price at time:", error.message);
    return null;
  }
};
export const getDailyRatesForPastYear = async (sellCurrency, buyCurrency) => {
  const currency = `${buyCurrency}/${sellCurrency}`;
  // Compute date range: 1 year ago → today
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  // Add 1 day so the end date is inclusive
  //   endDate.setDate(endDate.getDate() + 1);
  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];
  const url = `${TWELVE_DATA_URL}?symbol=${encodeURIComponent(
    currency
  )}&interval=1day&start_date=${encodeURIComponent(
    startStr
  )}&end_date=${encodeURIComponent(endStr)}&apikey=${TWELVE_DATA_API_KEY}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.status !== "ok" || !data.values || data.values.length === 0) {
      throw new Error("No data found for that range.");
    }
    const values = response.data.values.reverse();
    return values;
  } catch (error) {
    console.error("Error fetching daily rates for past year:", error.message);
    return null;
  }
};
