import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
dotenv.config();
import userRoutes from "../routes/userRoutes.js";
import studentRoutes from "../routes/studentRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.URI;

await mongoose.connect(uri).then(() => {
  console.log("MongoDB Connected");
});

app.use("/user", userRoutes);
app.use("/student", studentRoutes);
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
