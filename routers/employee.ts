import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyTokens";

import { getEmployees, addEmployee, deleteEmployee } from "../controllers/employeesController";

router.get("/employees", verifyToken, getEmployees);

router.post("/employees", verifyToken, addEmployee);

router.delete("/employees/:id", verifyToken, deleteEmployee);

export default router;
