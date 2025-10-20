const toISODate = (date) => {
  return date.toISOString().split("T")[0];
};

const computeLogReturn = (values) => {
  const logs = [];
  for (let i = 1; i < values.length; i++) {
    logs.push(Math.log(values[i] / values[i - 1]));
  }
  return logs;
};

const randn = () => {
  const u = 1 - Math.random();
  const v = 1 - Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return z;
};

export const simulateFXPath = (
  historicalData,
  horizon = 365,
  omega = 0.000001,
  alpha = 0.1,
  beta = 0.85
) => {
  // Extract only the numeric values for log return calculation
  const values = historicalData.map((d) => (Array.isArray(d) ? d[1] : d));

  // Compute log returns
  const logReturns = computeLogReturn(values);

  // Initialize variance
  const mean = logReturns.reduce((a, b) => a + b, 0) / logReturns.length;
  const variance =
    logReturns.reduce((a, b) => a + (b - mean) ** 2, 0) / logReturns.length;
  let sigma2 = variance;

  let rate = values.at(-1);

  // Start from the last known date
  const lastDate = new Date(
    Array.isArray(historicalData.at(-1)) ? historicalData.at(-1)[0] : new Date()
  );

  const path = [[toISODate(lastDate), Number(rate)]];

  for (let t = 1; t <= horizon; t++) {
    const z = randn();
    sigma2 = omega + alpha * logReturns.at(-1) ** 2 + beta * sigma2;
    const ret = Math.sqrt(sigma2) * z;

    rate *= Math.exp(ret);

    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + t);

    path.push([toISODate(nextDate), Number(rate.toFixed(4))]);

    logReturns.push(ret);
  }

  return path;
};
