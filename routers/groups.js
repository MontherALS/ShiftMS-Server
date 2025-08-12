const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

router.get("/groups", async (req, res) => {
  try {
    const groups = await Group.find();

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
    const group = await Group.findById(id).populate("employees");
    if (!group) return res.status(404).json({ msg: "no data for this group" });
    res.status(200).json(group);
  } catch (err) {
    console.log("Error happend : ", err.message);
  }
});
router.post("/groups", async (req, res) => {
  const { name, workingDays, shiftStart, shiftEnd } = req.body;
  const newGroup = {
    name,
    workingDays,
    shiftStart,
    shiftEnd,
  };
  const group = new Group(newGroup);
  await group.save();
  console.log("Group created:", group);
  res.status(201).json(group);
});
router.put("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, workingDays, shiftStart, shiftEnd } = req.body;
    const updatedData = {
      name,
      workingDays,
      shiftStart,
      shiftEnd,
    };
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

module.exports = router;
