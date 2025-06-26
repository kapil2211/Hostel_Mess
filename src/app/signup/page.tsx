'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaHotel, FaUserTag } from 'react-icons/fa';
import { MdEmail, MdPerson, MdSchool } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FiEye, FiEyeOff, FiPhone } from 'react-icons/fi';
import { BsDoorClosed } from 'react-icons/bs';
import { HiIdentification } from 'react-icons/hi';
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';

const hostelOptions = ['Rajputana', 'Morvi', 'Dhanrajgiri', 'Vishwakarma', 'Vishwanath'];
const roleOptions = ['Student', 'Mess_Owner'];
const branchOptions = ['Computer Science', "Electronics", "Electrical", "Mechanical", "Chemical", "Metallurgical", "Mining", "Civil", "Ceramics"];

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNo: '',
        hostel: '',
        role: '',
        branch: '',
        roomNo: '',
        rollNo: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", formData);
            console.log("Signup Success", response.data);
            router.push("/login");
        }
        catch (error: unknown) {
            console.log("SignUp failed");
            if (axios.isAxiosError(error)) {
                console.log(error);
                toast.error(error.response?.data?.message || error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }

    useEffect(() => {
        const {
            email,
            username,
            password,
            phoneNo,
            hostel,
            role,
            branch,
            rollNo,
            roomNo,
        } = formData;

        const isBaseFilled = email && username && password && phoneNo && hostel && role;

        if (!isBaseFilled) {
            setButtonDisabled(true);
            return;
        }

        if (role === 'Student') {
            const isStudentValid = branch && rollNo && roomNo;
            setButtonDisabled(!isStudentValid);
        } else if (role === 'Mess_Owner') {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [formData]);


    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <Image
                src="/images/loginbg.jpeg"
                alt="Login Background"
                fill
                className="object-cover -z-10"
            />

            <div className="relative z-10 flex h-full items-center justify-center overflow-y-auto py-8">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSignup();
                }} className="max-w-2xl w-full mt-50 bg-white p-8 rounded-lg shadow-md backdrop-blur border">
                    <h2 className="text-2xl font-bold text-center mb-6 underline">Sign Up</h2>

                    {/* Username */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-800">Username</label>
                        <div className="relative">
                            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-800">Email address</label>
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-800">Password</label>
                        <div className="relative">
                            <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-800">Contact Number</label>
                            <div className="relative">
                                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                                <input
                                    type="text"
                                    value={formData.phoneNo}
                                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                                    className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Enter your contact number"
                                />
                            </div>
                        </div>

                        {/* Hostel Dropdown */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-800">Hostel</label>
                            <div className="relative">
                                <FaHotel className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                                <select
                                    value={formData.hostel}
                                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                                    className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>Choose your Hostel</option>
                                    {hostelOptions.map((h) => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Contact */}


                    {/* Role Dropdown */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-800">Role</label>
                        <div className="relative">
                            <FaUserTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">

                                <option value="" disabled>Choose your Role</option>
                                {roleOptions.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Student-Specific Fields */}
                    {formData.role === 'Student' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            {/* Branch */}
                            <div >
                                <label className="block text-sm font-medium text-gray-800">Branch</label>
                                <div className="relative">
                                    <MdSchool className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                                    <select
                                        value={formData.branch}
                                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                        className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >

                                        <option value="" disabled>Select branch</option>
                                        {branchOptions.map((b) => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Room Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-800">Room Number</label>
                                <div className="relative">
                                    <BsDoorClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                                    <input
                                        type="text"
                                        value={formData.roomNo}
                                        onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                                        className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter room number"
                                    />
                                </div>
                            </div>

                            {/* Roll Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-800">Roll Number</label>
                                <div className="relative">
                                    <HiIdentification className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                                    <input
                                        type="text"
                                        value={formData.rollNo}
                                        onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                                        className="mt-1 block w-full rounded-xl border-gray-300 pl-12 py-3 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter roll number"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button type="submit" disabled={buttonDisabled || loading} className={`${buttonDisabled || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500'
                            } text-white font-semibold px-6 py-2 rounded-xl text-sm`}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>

                    {/* Or Divider */}
                    <div className='mb-4 mt-4 text-center text-sm text-gray-500'>
                        or continue with
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-4 justify-center">
                        <button type="button" className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100">
                            <FcGoogle size={20} /> Google
                        </button>
                        <button type="button" className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100 text-blue-600">
                            <FaFacebook size={20} /> Facebook
                        </button>
                    </div>

                    {/* Already have an account */}
                    <div className='mt-4 flex text-left text-sm text-gray-600'>
                        <p>Already have an account?</p>
                        <Link href="/login" className="text-orange-500 hover:text-orange-800 pl-2">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
