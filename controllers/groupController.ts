import Group from "../models/Group";
import Employee from "../models/Employee";
import { Request, Response } from "express";

type GroupType = {
  name: string;
  workingDays: string[];
  shiftStart: string;
  shiftEnd: string;
  supervisor?: string;
  employees: string[];
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user.id;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
    }
    const groups = await Group.find({ admin: adminId }).populate("supervisor");

    res.status(200).json(groups);
  } catch (err: any) {
    console.log("Getting Groups error:", err.message);

    res.status(500).json({ message: "Failed to get groups" });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user.id;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
    }
    const { id } = req.params;

    const group = await Group.findOne({ _id: id, admin: adminId }).populate("employees").populate("supervisor");

    if (!group) return res.status(404).json({ message: "no data for this group" });

    res.status(200).json(group);
  } catch (err: any) {
    console.log("Error happend : ", err.message);

    res.status(500).json({ message: "Failed to get group by ID" });
  }
};

export const createGroup = async (req: Request<{}, {}, GroupType>, res: Response) => {
  try {
    const adminId = (req as any).user.id;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
    }
    const { name, workingDays, shiftStart, shiftEnd, supervisor } = req.body;

    const newGroup = {
      name,
      workingDays,
      shiftStart,
      shiftEnd,
      supervisor: supervisor || null,
      admin: adminId,
    };

    const group = new Group(newGroup);

    await group.save();

    res.status(201).json(group);
  } catch (err: any) {
    console.log("Error creating group:", err.message);
    res.status(500).json({ message: "Failed to create group" });
  }
};

export const updateGroup = async (req: Request<{ id: string }, {}, GroupType>, res: Response) => {
  try {
    const adminId = (req as any).user.id;
    const { id } = req.params;
    const { name, workingDays, shiftStart, shiftEnd, supervisor, employees } = req.body;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
    }

    const updatedData = {
      name,
      workingDays,
      shiftStart,
      shiftEnd,
      supervisor: supervisor || null,
      employees,
    };

    const updatedGroup = await Group.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedGroup) return res.status(404).json({ message: "Cannot find the group" });

    await Employee.updateMany({ group: updatedGroup._id }, { $unset: { group: "" } });

    if (employees.length > 0) {
      await Employee.updateMany({ _id: { $in: employees } }, { group: updatedGroup._id });
    }

    res.status(200).json({ message: "Group updated successfully", group: updatedGroup });
  } catch (err: any) {
    console.log("Error updating group:", err.message);

    res.status(500).json({ message: "Failed to update group" });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user.id;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
    }
    const { id } = req.params;

    const group = await Group.findOneAndDelete({ _id: id, admin: adminId });

    if (!group) return res.status(404).json({ message: "Cannot find the group " });

    await Employee.updateMany({ group: id }, { $unset: { group: "" } });

    res.status(200).json({ message: "group has been deleted" });
  } catch (err: any) {
    console.log("Error deleting group:", err.message);

    res.status(500).json({ message: "Failed to delete group" });
  }
};
