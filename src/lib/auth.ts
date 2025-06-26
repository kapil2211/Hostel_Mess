// let jwt  token  decode the token here 

import jwt from "jsonwebtoken";

// typescript interface where we declared all used variables with their datatypes
export interface AuthUser {
  id: string;
  email: string;
  role: 'Student' | 'Mess_Owner';
}

export const verifyToken = (token: string): AuthUser | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
  } catch (err) {
    console.error("Invalid Toke",err);
    return null;
  }
};
