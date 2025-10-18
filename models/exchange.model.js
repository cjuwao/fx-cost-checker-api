import mongoose from "mongoose";

const ExchangeSchema = new mongoose.Schema(
  {
    buyCurrency: {
      type: String,
      required: true,
    },
    sellCurrency: {
      type: String,
      required: true,
    },
    buyAmount: {
      type: Number,
      required: true,
    },
    sellAmount: {
      type: Number,
      required: true,
    },
    midMarketRate: {
      type: Number,
      required: true,
    },
    providerRate: {
      type: Number,
      required: true,
    },
    profitPercentage: {
      type: Number,
      required: true,
    },
    profitAmount: {
      type: Number,
      required: true,
    },
    exchangeSaving: {
      type: Number,
      required: true,
    },
    annualSaving: {
      type: Number,
      required: true,
    },
    fxRequirement: {
      type: Number,
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExchangeModel = mongoose.model("Exchange", ExchangeSchema);

export default ExchangeModel;
