// app/api/login/route.ts
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!token) throw new Error("No token found");

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.id;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null; // <- return null, not response
  }
};
