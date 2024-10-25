import { Request, Response } from "express";
import { ProcessCheckout } from "../services/CheckoutService";
import { errorResponse, successResponse } from "../utils/responseHandler";

export const checkout = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    const result = await ProcessCheckout(user._id);

    return successResponse(res, 200, result);
  } catch (error: any) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
