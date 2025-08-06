const express = require("express");
const router = express.Router();

router.get("/groups", (req, res) => {
  res.status(200).json(dummyGroups);
});

router.post("/groups", (req, res) => {
  const newGroup = req.body;
});
router.put("/groups/:id", (req, res) => {
  const { id } = req.params;
  const updatedGroup = req.body;
});
router.delete("/groups/:id", (req, res) => {
  const { id } = req.params;
});

module.exports = router;
