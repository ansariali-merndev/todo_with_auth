import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const CheckAuth = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const errorResponse = NextResponse.json({
    message: "unauthorized",
  });

  if (!userId) {
    return errorResponse;
  }

  const [signatureFromCookie, id] = userId.split(".") || [];

  const expectedSignature = createHmac("sha256", process.env.COOKIE_SECRET)
    .update(id)
    .digest("hex");

  if (signatureFromCookie !== expectedSignature) {
    return errorResponse;
  }

  return id;
};
