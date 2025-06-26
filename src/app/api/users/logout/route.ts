// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function GET() {
    const response = NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 }
    );

    // Clear the token cookie by setting it with empty value and 0 maxAge
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0, // Expire immediately
    });

    return response;
}
