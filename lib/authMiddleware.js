import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const CheckAuth = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  return userId;
};
