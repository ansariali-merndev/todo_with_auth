import mongoose from "mongoose";

const SessionsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

export const Session_db =
  mongoose.models.Session || mongoose.model("Session", SessionsSchema);
