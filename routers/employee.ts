import express from "express";
const router = express.Router();
import { getEmployees, addEmployee, deleteEmployee } from "../controllers/employeesController";

router.get("/employees", getEmployees);

router.post("/employees", addEmployee);

router.delete("/employees/:id", deleteEmployee);

export default router;
