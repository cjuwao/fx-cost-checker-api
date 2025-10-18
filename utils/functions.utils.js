export const calculateMidMarketRate = (quote) => {
  const avgHighLow = (quote.high + quote.low) / 2;
  const avgOpenClose = (quote.open + quote.close) / 2;
  return (avgHighLow + avgOpenClose) / 2;
};
