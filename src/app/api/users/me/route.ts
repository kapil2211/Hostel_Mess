// app/api/login/route.ts
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();

export async function POST(req: NextRequest) {
  const userId = getDataFromToken(req);
  if (!userId) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "User found",
    success: true,
    user
  });
}
