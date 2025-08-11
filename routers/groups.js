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
router.put("/groups/:id", (req, res) => {
  const { id } = req.params;
  const updatedGroup = req.body;
});
router.delete("/groups/:id", (req, res) => {
  const { id } = req.params;
});

module.exports = router;
