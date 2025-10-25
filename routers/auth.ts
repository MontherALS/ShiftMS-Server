import express from "express";
import { login, signup } from "../controllers/authController";
import { refreshToken } from "../middleware/verifyTokens";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/refresh-token", refreshToken);

export default router;
