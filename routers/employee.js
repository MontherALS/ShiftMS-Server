const express = require("express");
const router = express.Router();

router.get("/employees", (req, res) => {
  res.status(200).json(dummyEmployees);
});
router.post("/addEmployee", (req, res) => {
  const { name, phoneNumber, id, position } = req.body;
  const newEmployee = {
    name,
    phoneNumber,
    id,
    position,
  };
});
router.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  // Logic to delete the employee by id
});

module.exports = router;
