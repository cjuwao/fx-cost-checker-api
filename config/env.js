import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  TRADERMADE_API_KEY,
  TRADERMADE_URL,
  TWELVE_DATA_API_KEY,
  TWELVE_DATA_URL,
} = process.env;
