import { Request, Response } from "express";
import { body } from "express-validator";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { AddItemToCart, RemoveItemFromCart } from "../services/CartService";

export const cartValidationRules = [
  body("productId").isString().notEmpty(),
  body("quantity").isNumeric().notEmpty(),
];

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { productId, quantity } = req.body;

    // Add product to cart
    const cart = await AddItemToCart({
      userId: user._id,
      productId,
      quantity,
    });

    return successResponse(res, 200, { cart });
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    // Remove product from cart
    const cart = await RemoveItemFromCart({
      userId: user._id,
      productId,
    });

    return successResponse(res, 200, { cart });
  } catch (error: any) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
