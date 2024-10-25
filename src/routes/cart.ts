import { Router } from "express";
import {
  addToCart,
  cartValidationRules,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller";
import { auth } from "../auth/auth";
import validateRequest from "../middlewares/requestValidator";

const router = Router();

router.get("/", auth, getCart);

router.post("/", auth, cartValidationRules, validateRequest, addToCart);

router.delete("/:productId", auth, removeFromCart);

export default router;
