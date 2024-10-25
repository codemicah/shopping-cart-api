import "dotenv/config";
import { createServer } from "node:http";
import app from "./app";
import { config } from "./config/env";
import { connect } from "./config/database";
import { connectRedis } from "./utils/cache";

const { PORT } = config;

const server = createServer(app);

connect()
  .then(() => {
    console.log("MongoDB connection successful");
    connectRedis()
      .then(() => {
        server.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}`);
        });
      })
      .catch((error) => {
        console.log("Error connecting to Redis: ", error);
      });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });
