import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cartRouter from "./routes/cart";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/cart", cartRouter);
app.use("/products", productRouter);
app.use("/auth", authRouter);

app.get("/test", (_req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.use("*", (req: Request, res: Response) => {
  const path = req.originalUrl;
  const method = req.method;
  return res.status(404).json({
    error: true,
    path,
    method,
    message: `The method ${method} is not defined on path ${path}`,
  });
});

export default app;
