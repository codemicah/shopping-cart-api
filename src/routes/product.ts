import { Router } from "express";
import { auth } from "../auth/auth";
import {
  getAllProducts,
  getProductById,
} from "../controllers/product.controller";

const router = Router();

router.get("/", auth, getAllProducts);

router.get("/:id", auth, getProductById);

export default router;
