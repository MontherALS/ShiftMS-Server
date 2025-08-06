const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const groups = require("./routers/groups");
const employee = require("./routers/employee");
const auth = require("./routers/auth");
const dbUri =
  "mongodb+srv://n4wafxhd:A8qTsZT0EFqdzrmz@cluster0.cc124h9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Temp export for testing purposes
const {
  dummyEmployees,
  dummyGroups,
  employeeGroupAssignments,
} = require("./util/DummyData");

app.use(express.json());

app.use(cors());

app.get("/dashboard", (req, res) => {
  res.status(200).json({
    employees: dummyEmployees,
    groups: dummyGroups,
    assignments: employeeGroupAssignments,
  });
});

//routers
app.use(auth);
app.use(groups);
app.use(employee);

mongoose
  .connect(dbUri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
