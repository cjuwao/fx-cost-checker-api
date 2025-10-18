import axios from "axios";
import { TRADERMADE_API_KEY, TRADERMADE_URL } from "../config/env.js";

export const getMinuteHistoricalData = async (
  sellCurrency,
  buyCurrency,
  date_time
) => {
  try {
    const currency = `${sellCurrency}${buyCurrency}`;

    // const response = await axios.get(`${TRADERMADE_URL}/historical/minute`, {
    //   params: {
    //     currency: currency,
    //     date_time: date_time,
    //     api_key: TRADERMADE_API_KEY,
    //   },
    // });

    const response = {
      data: {
        endpoint: "minute_historical",
        currency: `${currency}`,
        date_time: "2019-10-09-13:24",
        open: 1.3544,
        high: 1.359,
        low: 1.3514,
        close: 1.3524,
        request_time: "Thu, 31 Oct 2019 15:45:43 GMT",
      },
    };

    return response.data;
  } catch (error) {
    console.error("Error fetching minute historical data:", error.message);
    return null;
  }
};

export const getTimeSeriesData = async () => {};
