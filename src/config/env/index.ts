import dotenv from "dotenv";
import { schema } from "./schema";
import { Validate } from "./validators";
import { ConfigTypes } from "../types";
dotenv.config();

// validate environment variables
const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
  PORT: envVariables.PORT,
  JWT_SECRET: envVariables.JWT_SECRET,
  MONGODB_URI: envVariables.MONGODB_URI,
  REDIS_USERNAME: envVariables.REDIS_USERNAME,
  REDIS_PASSWORD: envVariables.REDIS_PASSWORD,
  REDIS_HOST: envVariables.REDIS_HOST,
  REDIS_PORT: envVariables.REDIS_PORT,
  REDIS_DB: envVariables.REDIS_DB,
};
