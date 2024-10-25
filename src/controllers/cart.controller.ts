import { Request, Response } from "express";
import { body, param } from "express-validator";
import { errorResponse, successResponse } from "../utils/responseHandler";
import {
  AddItemToCart,
  GetCart,
  RemoveItemFromCart,
} from "../services/CartService";

export const cartValidationRules = (action?: string) => {
  switch (action) {
    case "remove":
      return [param("productId").isMongoId().withMessage("Invalid product id")];
    default:
      return [
        body("productId").isMongoId().notEmpty(),
        body("quantity").isNumeric().notEmpty(),
      ];
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    // Get cart
    const cart = await GetCart(user._id);

    return successResponse(res, 200, { cart });
  } catch (error: any) {
    return errorResponse(res, error.statusCode, error.message);
  }
};

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
    return errorResponse(res, error.statusCode, error.message);
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
    return errorResponse(res, error.statusCode, error.message);
  }
};
