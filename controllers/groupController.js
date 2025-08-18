import Group from "../models/Group.js";
import Employee from "../models/Employee.js";

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("supervisor");

    if (!groups)
      return res.status(404).json({ msg: "cannot find Groups in db" });
    res.status(200).json(groups);
  } catch (err) {
    console.log("Getting Groups error:", err.message);
    res.status(500).json({ msg: "Failed to get groups" });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id)
      .populate("employees")
      .populate("supervisor");
    if (!group) return res.status(404).json({ msg: "no data for this group" });
    res.status(200).json(group);
  } catch (err) {
    console.log("Error happend : ", err.message);
    res.status(500).json({ msg: "Failed to get group by ID" });
  }
};
export const createGroup = async (req, res) => {
  try {
    const { name, workingDays, shiftStart, shiftEnd, supervisor } = req.body;
    const newGroup = {
      name,
      workingDays,
      shiftStart,
      shiftEnd,
      supervisor,
    };
    const group = new Group(newGroup);
    await group.save();
    console.log("Group created:", group);
    res.status(201).json(group);
  } catch (err) {
    console.log("Error creating group:", err.message);
    res.status(500).json({ msg: "Failed to create group" });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, workingDays, shiftStart, shiftEnd, supervisor, employees } =
      req.body;

    const updatedData = {
      name,
      workingDays,
      shiftStart,
      shiftEnd,
      supervisor,
      employees,
    };

    const group = await Group.findByIdAndUpdate(id, updatedData, { new: true });
    if (!group) return res.status(404).json({ msg: "Cannot find the group" });

    if (employees && employees.length > 0) {
      await Employee.updateMany(
        { _id: { $in: employees } },
        { group: group._id }
      );
    }

    res.status(200).json({ msg: "Group updated successfully", group });
  } catch (err) {
    console.log("Error updating group:", err.message);
    res.status(500).json({ msg: "Failed to update group" });
  }
};
export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findByIdAndDelete(id);
    if (!group) return res.status(404).json({ msg: "Cannot find the group " });

    res.status(200).json({ msg: "group has been deleted" });
  } catch (err) {
    console.log("Error deleting group:", err.message);
    res.status(500).json({ msg: "Failed to delete group" });
  }
};
