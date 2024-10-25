import mongoose from "mongoose";
import { config } from "./env";

const { MONGODB_URI } = config;

export const connect = async () => {
  return await mongoose.connect(MONGODB_URI);
};
