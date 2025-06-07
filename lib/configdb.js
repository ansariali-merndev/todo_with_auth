import mongoose from "mongoose";

export async function connectDB() {
  const URI = process.env.DBURI;
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected");
      return;
    }
    await mongoose.connect(URI, {
      dbName: "Todos",
    });
    console.log("db connected successfully");
  } catch (error) {
    console.log("failed", error.message);
  }
}
