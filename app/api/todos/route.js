import { CheckAuth } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/configdb";
import { Todo_DB } from "@/model/TodosModel";

export async function GET() {
  await connectDB();
  const userId = await CheckAuth();
  if (userId instanceof Response) {
    return userId;
  }
  try {
    const data = await Todo_DB.find({ userId });
    return Response.json({
      message: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "error",
    });
  }
}

export async function POST(request) {
  await connectDB();
  const userId = await CheckAuth();
  if (userId instanceof Response) {
    return userId;
  }
  try {
    const { task } = await request.json();
    const Todo = new Todo_DB({ userId, task });
    await Todo.save();
    return Response.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "error",
    });
  }
}

export async function DELETE(request) {
  await connectDB();
  const userId = await CheckAuth();
  if (userId instanceof Response) {
    return userId;
  }
  try {
    const { _id } = await request.json();
    await Todo_DB.deleteOne({ _id });
    return Response.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "error",
    });
  }
}

export async function PUT(request) {
  await connectDB();
  const userId = await CheckAuth();
  if (userId instanceof Response) {
    return userId;
  }
  try {
    const { _id, completed } = await request.json();
    await Todo_DB.findByIdAndUpdate(_id, { completed }, { new: true });
    return Response.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "error",
    });
  }
}
