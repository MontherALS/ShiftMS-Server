import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyTokens";
import { groupValidationRules, groupValidator } from "../middleware/Validator";
import { getGroups, getGroupById, createGroup, updateGroup, deleteGroup } from "../controllers/groupController";

router.get("/groups", verifyToken, getGroups);

router.post("/groups", verifyToken, groupValidationRules, groupValidator, createGroup);

router.get("/groups/:id", verifyToken, getGroupById);

router.put("/groups/:id", verifyToken, groupValidationRules, groupValidator, updateGroup);

router.delete("/groups/:id", verifyToken, deleteGroup);

export default router;
