import express from "express";
const router = express.Router();
import { getEmployees, addEmployee, deleteEmployee } from "../controllers/employeesController.js";

router.get("/employees", getEmployees);

router.post("/add-employee", addEmployee);

router.delete("/employees/:id", deleteEmployee);

export default router;
