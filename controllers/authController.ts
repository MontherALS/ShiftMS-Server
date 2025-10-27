import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import bycript from "bcryptjs";

type AdminType = {
  email: string;
  password: string;
};

export const signup = async (req: Request<{}, {}, AdminType>, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const hashedPassword = await bycript.hash(password, 10);

    const newAdmin = new Admin({ email, password: hashedPassword });

    await newAdmin.save();

    return res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request<{}, {}, AdminType>, res: Response) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bycript.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const refreshToken = jwt.sign({ id: admin._id }, process.env.REFRESH_TOKEN_SECRET as string);

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
