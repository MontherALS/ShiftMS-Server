import express from "express";
const router = express.Router();

import { getGroups, getGroupById, createGroup, updateGroup, deleteGroup } from "../controllers/groupController.js";

router.get("/groups", getGroups);

router.post("/groups", createGroup);

router.get("/groups/:id", getGroupById);

router.put("/groups/:id", updateGroup);

router.delete("/groups/:id", deleteGroup);

export default router;
