import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Group from "../models/Group";
import Admin from "../models/Admin";
import Employee from "../models/Employee";

// Signup Validation rules

export const signupValidationRules = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail()
    .custom(async (value: string) => {
      const existingUser = await Admin.findOne({ email: value });

      if (existingUser) {
        throw new Error("Email already in use");
      }
    })
    .bail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 digits long")
    .bail()
    .isAlphanumeric()
    .withMessage("Password must contain only letters and numbers")
    .bail(),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .bail()
    .custom((value: string, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match validator");
      }
      return true;
    }),
];

export const signupValidator = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Group Validation rules

export const groupValidationRules = [
  body("name")
    .notEmpty()
    .withMessage("Group name is required")
    .custom(async (value: string) => {
      const existingGroup = await Group.findOne({ name: value });
      console.log(existingGroup, "from validator");
      if (existingGroup) {
        throw new Error("Group name already in use");
      }
      return true;
    }),
  body("workingDays").isArray({ min: 1 }).withMessage("At least one working day must be selected"),
  body("shiftStart").notEmpty().withMessage("Shift start time is required"),
  body("shiftEnd").notEmpty().withMessage("Shift end time is required"),
];
export const groupValidator = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Employee Validation rules

export const employeeValidationRules = [
  body("name").notEmpty().withMessage("Employee name is required"),
  body("phone")
    .notEmpty()
    .withMessage("Employee phone is required")
    .custom(async (value: string) => {
      const existingPhone = await Employee.findOne({ phone: value });

      if (existingPhone) {
        throw new Error("Phone number already in use , please use another one");
      }
      return true;
    }),
];

export const employeeValidator = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
