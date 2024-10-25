import { Router } from "express";
import {
  addToCart,
  cartValidationRules,
  removeFromCart,
} from "../controllers/cart.controller";
import { auth } from "../auth/auth";
import validateRequest from "../middlewares/requestValidator";

const router = Router();

router.post("/", auth, cartValidationRules, validateRequest, addToCart);

router.delete("/:productId", auth, removeFromCart);

export default router;
