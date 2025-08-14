const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Group = require("../models/Group");
router.get("/employees", async (req, res) => {
  const employees = await Employee.find().populate("group");
  if (!employees)
    return res.status(404).json({ message: "No employees found" });
  res.status(200).json(employees);
});
router.post("/add-employee", async (req, res) => {
  const { name, phone, email, group } = req.body;
  const newEmployee = {
    name,
    phone,
    email,
    group,
  };
  const foundGroup = await Group.findById(group);
  if (!foundGroup) {
    return res.status(404).json({ message: "Group not found" });
  }
  const employee = new Employee(newEmployee);
  await employee.save();
  foundGroup.employees.push(employee._id);
  await foundGroup.save();
  res.status(201).json(employee);
});
router.delete("/employees/:id", async (req, res) => {});

module.exports = router;
