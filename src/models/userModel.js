import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter your userName"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your EmailID"],
        unique: true,
    }, 
    phoneNo: {
        type: String,
        required: [true, "Please enter your phone number"],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
    },
    role: {
        type: String,
        enum: ["Student", "Mess_Owner"],
        required: [true, "Please select your Role"],
    },
    hostel: {
        type: String,
        required: [true, "Please enter your hostel name"],
    },
    branch: {
        type: String,
    },
    rollNo: {
        type: String,
        unique: true,
        sparse: true
    },
   
    roomNo: {
        type: String,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// ✅ Pre-validation hook to enforce conditional required fields
userSchema.pre("validate", function (next) {
    if (this.role === "Student") {
        if (!this.branch) {
            this.invalidate("branch", "Please Enter your Branch");
        }
        if (this.rollNo === undefined || this.rollNo === null) {
            this.invalidate("rollNo", "RollNo is required");
        }
        if (this.roomNo === undefined || this.roomNo === null) {
            this.invalidate("RoomNo", "RoomNo is required");
        }
    }
    next();
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
