import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { GetAllProducts, GetProductById } from "../services/ProductService";
import { param } from "express-validator";

export const getProductByIdValidationRules = [
  param("id").isMongoId().withMessage("Invalid product id"),
];

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const { products, total_products } = await GetAllProducts({}, page, limit);

    return successResponse(res, 200, { page, limit, total_products, products });
  } catch (error: any) {
    return errorResponse(res, error.statusCode, error.message);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await GetProductById(id);

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    return successResponse(res, 200, { product });
  } catch (error: any) {
    return errorResponse(res, error.statusCode, error.message);
  }
};
