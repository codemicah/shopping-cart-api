import { Joi } from "celebrate";

// define validation for all the env vars
export const schema = {
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  MONGODB_URI: Joi.string().required(),
  REDIS_USERNAME: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_DB: Joi.exist(),
};
