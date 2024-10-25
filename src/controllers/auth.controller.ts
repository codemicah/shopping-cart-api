import { Request, Response } from "express";
import { body } from "express-validator";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { LoginUser } from "../services/AuthService";

export const loginValidationRules = [
  body("email").isEmail().notEmpty(),
  body("password").isString().notEmpty(),
];

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const response = await LoginUser(email, password);

    return successResponse(res, 200, response);
  } catch (error: any) {
    return errorResponse(res, error.statusCode, error.message);
  }
};
