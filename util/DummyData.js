// Dummy JSON data for groups and employees

const dummyEmployees = [
  {
    name: "John Smith",
    phoneNumber: "+1-555-0123",
    id: "EMP001",
    position: "Manager",
  },
  {
    name: "Sarah Johnson",
    phoneNumber: "+1-555-0124",
    id: "EMP002",
    position: "Supervisor",
  },
];

const dummyGroups = [
  {
    name: "Morning Shift A",
    shiftStart: "06:00",
    shiftEnd: "14:00",
    employees: [],
  },
  {
    name: "Morning Shift B",
    shiftStart: "07:00",
    shiftEnd: "15:00",
    employees: [],
  },
  {
    name: "Afternoon Shift",
    shiftStart: "14:00",
    shiftEnd: "22:00",
    employees: [],
  },
];

// Sample assignment of employees to groups (using employee IDs for reference)
// const employeeGroupAssignments = {
//   "Morning Shift A": ["EMP001", "EMP003", "EMP007"],
//   "Morning Shift B": ["EMP002", "EMP004"],
//   "Afternoon Shift": ["EMP005", "EMP006"],
//   "Evening Shift": ["EMP008", "EMP003"],
//   "Night Shift": ["EMP001", "EMP005"],
//   "Weekend Day Shift": ["EMP002", "EMP006", "EMP007"],
// };

module.exports = {
  dummyEmployees,
  dummyGroups,
  // employeeGroupAssignments,
};
