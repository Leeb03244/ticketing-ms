import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");
  if (!process.env.MONGO_DB_URI)
    throw new Error("MONGO_DB_URI must be defined");
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Tickets service connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Tickets service listening on port 3000");
  });
};

start();
