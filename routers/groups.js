const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

router.get("/groups", async (req, res) => {
  try {
    const groups = await Group.find().populate("supervisor");

    if (!groups)
      return res.status(404).json({ msg: "cannot find Groups in db" });
    res.status(200).json(groups);
  } catch (err) {
    console.log("Getting Groups error:", err.message);
  }
});
router.get("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id)
      .populate("employees")
      .populate("supervisor");
    if (!group) return res.status(404).json({ msg: "no data for this group" });
    res.status(200).json(group);
  } catch (err) {
    console.log("Error happend : ", err.message);
  }
});
router.post("/groups", async (req, res) => {
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
});
router.put("/groups/:id", async (req, res) => {
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
    console.log(updatedData);
    const group = await Group.findByIdAndUpdate(id, updatedData, { new: true });
    console.log("Group updated:", group);
    if (!group) return res.status(404).json({ msg: "Cannot find the group" });
    res.status(200).json({ msg: "Group updated successfully", group });
  } catch (err) {
    console.log("Error updating group:", err.message);
    res.status(500).json({ msg: "Failed to update group" });
  }
});
router.delete("/groups/:id", async (req, res) => {
  const { id } = req.params;
  const group = await Group.findByIdAndDelete(id);
  if (!group) return res.status(404).json({ msg: "Cannot find the group " });

  res.status(200).json({ msg: "group has been deleted" });
});
router.put("/groups/:id/remove-member", async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId } = req.body;
    console.log(id, employeeId);
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ msg: "No group was found" });

    group.employees = group.employees.filter(
      (empId) => empId.toString() !== employeeId
    );
    await group.save();

    res.status(200).json({ msg: "member was deleted succsufly" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
});
module.exports = router;
