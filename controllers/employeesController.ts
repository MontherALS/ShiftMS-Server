import { Request, Response } from "express";
import Employee from "../models/Employee";
import Group from "../models/Group";

interface EmployeesType {
  name: string;
  phone: string;
  group?: string;
}

export const getEmployees = async (req: Request, res: Response) => {
  const adminId = (req as any).user.id;
  try {
    const employees = await Employee.find({ admin: adminId }).populate("group");

    res.status(200).json(employees);
  } catch (err: any) {
    console.error("Error fetching employees:", err);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addEmployee = async (req: Request<{}, {}, EmployeesType>, res: Response) => {
  try {
    const adminId = (req as any).user.id;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
    }
    const newEmployee = {
      name: req.body.name,
      phone: req.body.phone,
      group: req.body.group,
      admin: adminId,
    };

    if (!newEmployee.name || !newEmployee.phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = new Employee(newEmployee);

    await employee.save();

    if (newEmployee.group) {
      const foundGroup = await Group.findById(newEmployee.group);

      if (!foundGroup) {
        return res.status(404).json({ message: "Group not found" });
      }

      foundGroup.employees.push(employee._id);

      await foundGroup.save();
    }

    res.status(201).json(employee);
  } catch (err: any) {
    res.status(500).json({ message: "Server error: Failed to add employee" });

    console.log(err.message);
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = (req as any).user.id;

    const employee = await Employee.findOneAndDelete({ _id: id, admin: adminId });

    if (!employee) return res.status(404).json({ message: "No employees found" });

    await Group.updateMany({ employees: employee._id }, { $pull: { employees: employee._id } });

    res.status(200).json({ message: "Employee deleted" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error: Failed to delete employee" });

    console.log("error happend ", err.message);
  }
};
