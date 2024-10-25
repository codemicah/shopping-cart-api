import { Router } from "express";
import { checkout } from "../controllers/checkout.controller";
import { auth } from "../auth/auth";

const router = Router();

router.post("/", auth, checkout);

export default router;
