import express from "express";
import { login, signup } from "../controllers/authController";
import { refreshToken } from "../middleware/verifyTokens";
import { signupValidationRules, signupValidator } from "../middleware/Validator";

const router = express.Router();

router.post("/signup", signupValidationRules, signupValidator, signup);

router.post("/login", login);

router.post("/refresh-token", refreshToken);

export default router;
