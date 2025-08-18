import Employee from "../models/Employee.js";
import Group from "../models/Group.js";

export const getEmployees = async (req, res) => {
  const employees = await Employee.find().populate("group");
  if (!employees)
    return res.status(404).json({ message: "No employees found" });
  res.status(200).json(employees);
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

    const employee = new Employee(newEmployee);
    await employee.save();

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
    console.log(err.message);
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee)
      return res.status(404).json({ message: "No employees found" });

    res.status(200).json({ msg: "Employee deleted" });
  } catch (err) {
    console.log("error happend ", err.message);
  }
};
