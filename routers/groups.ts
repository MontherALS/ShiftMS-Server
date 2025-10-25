import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyTokens";
import { getGroups, getGroupById, createGroup, updateGroup, deleteGroup } from "../controllers/groupController";

router.get("/groups", verifyToken, getGroups);

router.post("/groups", verifyToken, createGroup);

router.get("/groups/:id", verifyToken, getGroupById);

router.put("/groups/:id", verifyToken, updateGroup);

router.delete("/groups/:id", verifyToken, deleteGroup);

export default router;
