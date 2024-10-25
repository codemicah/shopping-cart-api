import { Router } from "express";
import { login, loginValidationRules } from "../controllers/auth.controller";
import validateRequest from "../middlewares/requestValidator";

const router = Router();

router.post("/login", loginValidationRules, validateRequest, login);

export default router;
