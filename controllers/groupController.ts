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
    const groups = await Group.find().populate("supervisor");

    if (!groups) return res.status(404).json({ message: "cannot find Groups in db" });

    res.status(200).json(groups);
  } catch (err: any) {
    console.log("Getting Groups error:", err.message);

    res.status(500).json({ message: "Failed to get groups" });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id).populate("employees").populate("supervisor");

    if (!group) return res.status(404).json({ message: "no data for this group" });

    res.status(200).json(group);
  } catch (err: any) {
    console.log("Error happend : ", err.message);

    res.status(500).json({ message: "Failed to get group by ID" });
  }
};

export const createGroup = async (req: Request<{}, {}, GroupType>, res: Response) => {
  try {
    const { name, workingDays, shiftStart, shiftEnd, supervisor } = req.body;

    const newGroup = {
      name,
      workingDays,
      shiftStart,
      shiftEnd,
      supervisor: supervisor || null,
    };
    if (!newGroup.name || !newGroup.workingDays || !newGroup.shiftStart || !newGroup.shiftEnd) {
      return res.status(400).json({ message: "All fields are required" });
    }

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
    const { id } = req.params;

    const { name, workingDays, shiftStart, shiftEnd, supervisor, employees } = req.body;

    const updatedData = {
      name,
      workingDays,
      shiftStart,
      shiftEnd,
      supervisor: supervisor || null,
      employees,
    };

    const group = await Group.findByIdAndUpdate(id, updatedData, { new: true });

    if (!group) return res.status(404).json({ message: "Cannot find the group" });

    await Employee.updateMany({ group: group._id }, { $unset: { group: "" } });

    if (employees.length > 0) {
      await Employee.updateMany({ _id: { $in: employees } }, { group: group._id });
    }

    res.status(200).json({ message: "Group updated successfully", group });
  } catch (err: any) {
    console.log("Error updating group:", err.message);

    res.status(500).json({ message: "Failed to update group" });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const group = await Group.findByIdAndDelete(id);

    if (!group) return res.status(404).json({ message: "Cannot find the group " });

    res.status(200).json({ message: "group has been deleted" });
  } catch (err: any) {
    console.log("Error deleting group:", err.message);

    res.status(500).json({ message: "Failed to delete group" });
  }
};
