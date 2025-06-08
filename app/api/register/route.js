import { connectDB } from "@/lib/configdb";
import { User_DB } from "@/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectDB();
  try {
    const { name, email, password } = await request.json();

    //* ----------  Check User exist or Not ---------------
    const userExist = await User_DB.findOne({ email });
    if (userExist) {
      return Response.json({
        message: "failed",
        extraMessage: "User already exist",
      });
    }

    //* ------------ Hash Password  -----------------
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    //* ------------- Store in db --------------
    await User_DB.create({
      name,
      email,
      password: hashedPassword,
    });
    return Response.json(
      {
        message: "success",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return Response.json(
      {
        message: "error",
        extraMessage: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
