// Setup middleware.ts to Protect Routes by Role

import { NextRequest,NextResponse } from "next/server";
import {verifyToken} from "@/lib/auth"

export function middleware(req:NextRequest){
  // extract tokem from cookies after login;
  const token=req.cookies.get("token")?.value;
  const url=req.nextUrl;
  // define public routes 
  // here no need to check token is present or not
  if(url.pathname.startsWith("/login") || url.pathname.startsWith("/signu[")){
    return NextResponse.next();
  }

  // now check token
  if(!token){
    return NextResponse.redirect(new URL("/login",req.url));
  }

  // if token is present then there must be user
  // we will decode and extract info
  const user=verifyToken(token);

  // if user is not correct then redirect ot login agian
  if(!user){
    return NextResponse.redirect(new URL("/login",req.url));
  }

  //else user -based route guarding
  if(url.pathname.startsWith("/student") && user.role!=="Student"){
    return NextResponse.redirect(new URL("/unauthorized",req.url));
  }
  
  if (url.pathname.startsWith("/messowner") && user.role !== "Mess_Owner") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/messowner/:path*"],
};
