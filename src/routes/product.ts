import { Router } from "express";
import { auth } from "../auth/auth";
import {
  getAllProducts,
  getProductById,
  getProductByIdValidationRules,
} from "../controllers/product.controller";
import validateRequest from "../middlewares/requestValidator";

const router = Router();

router.get("/", auth, getAllProducts);

router.get(
  "/:id",
  auth,
  getProductByIdValidationRules,
  validateRequest,
  getProductById
);

export default router;
