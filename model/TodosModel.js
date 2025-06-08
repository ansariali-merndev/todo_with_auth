import mongoose from "mongoose";

const TodosSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Todo_DB =
  mongoose.models.Todo || mongoose.model("Todo", TodosSchema);
