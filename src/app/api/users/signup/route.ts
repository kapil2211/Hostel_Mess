import { connect } from '@/dbConfig/dbConfig'
// i want User model from database;
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';
// here u have to connect to database to each file
connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log("Incoming signup data:", reqBody);
        const { username, email, password, branch, role, rollNo, phoneNo, hostel, roomNo } = reqBody;
        //validation

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            branch,
            rollNo,
            phoneNo,
            roomNo,
            hostel,
            role,
        })
        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email;
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })



    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.error("Signup API Error:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error }), { status: 500 });
    }
}