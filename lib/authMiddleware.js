import { Session_db } from "@/model/SessionAuth";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const CheckAuth = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sessionId")?.value;
  const errorResponse = NextResponse.json({
    message: "unauthorized",
  });

  if (!sessionCookie) {
    return errorResponse;
  }

  const [signatureFromCookie, sessionId] = sessionCookie.split(".") || [];

  if (!signatureFromCookie || !sessionId) return errorResponse;

  const expectedSignature = createHmac("sha256", process.env.COOKIE_SECRET)
    .update(sessionId)
    .digest("hex");

  if (signatureFromCookie !== expectedSignature) {
    return errorResponse;
  }

  const session = await Session_db.findById(sessionId);
  return session.userId;
};
