import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import groups from "./routers/groups";
import employee from "./routers/employee";
import auth from "./routers/auth";

//TODO VALIDATOR

dotenv.config();

const dbUri = process.env.DBURL;

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use(auth);

app.use(groups);

app.use(employee);

if (dbUri) {
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
}
