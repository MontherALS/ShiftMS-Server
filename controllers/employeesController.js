import Employee from "../models/Employee.js";
import Group from "../models/Group.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("group");
    if (!employees) return res.status(404).json({ message: "No employees found" });
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const group = req?.body?.group || null;
    const newEmployee = {
      name,
      phone,
      email,
      group,
    };

    if (!newEmployee.name || !newEmployee.phone || !newEmployee.email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (newEmployee.name.length < 3) {
      return res.status(400).json({ message: "Name must be at least 3 characters long" });
    }
    if (newEmployee.phone.length < 13) {
      return res.status(400).json({
        message: "Phone number must be at least 13 digits starterd with (+966)",
      });
    }
    if (newEmployee.email.length < 8 || !newEmployee.email.includes("@") || !newEmployee.email.includes(".")) {
      return res.status(400).json({
        message: "Email must be at least 8 characters long and includes @ / .",
      });
    }

    const employee = new Employee(newEmployee);
    await employee.save();

    // Update group IF exists
    if (newEmployee.group) {
      const foundGroup = await Group.findById(group);

      if (!foundGroup) {
        return res.status(404).json({ message: "Group not found" });
      }

      foundGroup.employees.push(employee._id);
      await foundGroup.save();
    }

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error: Failed to add employee" });
    console.log(err.message);
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) return res.status(404).json({ message: "No employees found" });

    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error: Failed to delete employee" });
    console.log("error happend ", err.message);
  }
};
