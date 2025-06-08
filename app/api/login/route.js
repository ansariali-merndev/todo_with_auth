import { connectDB } from "@/lib/configdb";
import { User_DB } from "@/model/UserModel";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createHmac } from "crypto";
import { Session_db } from "@/model/SessionAuth";

export async function POST(request) {
  await connectDB();
  try {
    const { email, password } = await request.json();
    const cookieStore = await cookies();

    //* ------------- Check User Exist or Not --------------
    const checkUser = await User_DB.findOne({ email });
    if (!checkUser) {
      return Response.json({
        message: "failed",
      });
    }

    //* -------------- if user Present then check password -----------
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return Response.json({
        message: "failed",
      });
    }

    //* -------------- Store Session Id ------------------
    const session = await Session_db.create({
      userId: checkUser._id,
    });

    //* ------------------- CreateHmac ---------------------
    const signature = createHmac("sha256", process.env.COOKIE_SECRET)
      .update(session._id.toString())
      .digest("hex");

    const cookie = `${signature}.${session._id}`;

    //* -------------------- Store Cokie user Logged in ----------------------
    cookieStore.set("sessionId", cookie, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    //* -=------------------- Return Response ----------------------
    return Response.json({
      message: "success",
    });
  } catch (error) {
    console.log("Login Error: ", error);
    return Response.json({
      message: "error",
    });
  }
}
