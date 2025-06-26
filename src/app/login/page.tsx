'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { RiLockPasswordFill } from 'react-icons/ri'
import axios from "axios"
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

const Page = () => {
    const router = useRouter();
    const [buttonDisabled, setDisabledbutton] = useState(true);
    const [showpassword, setshowpassword] = useState(false);
    const [loading ,setLoading]=useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {setUser}=useAuth();
    const handlelogin = async () => {
        try {
            setLoading(true);
           const res= await axios.post("/api/users/login", formData);
            toast.success( "Login success")
            console.log("User Logged in ", formData);
             setUser(res.data.user); 
            router.push("/");
        } catch (error) {
            console.log("Login failed");
            setLoading(false);
            if (axios.isAxiosError(error)) {
                console.log(error);
                toast.error(error.response?.data?.message || error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }

    useEffect(() => {
        if (formData.email && formData.password) {
            setDisabledbutton(false);
            return;
        }
        else {
            setDisabledbutton(true);
        }

    }, [formData])

    return (
        <div className="relative h-screen w-screen">
            {/* Background Image */}
            <Image
                src="/images/loginbg.jpeg"
                alt="Login Background"
                fill={true}
                className="object-contian -z-6"
            />

            {/* Login Form */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <form onSubmit={(e) => { e.preventDefault(); handlelogin() }} className="max-w-md w-full bg-gray-50 p-8 rounded-lg shadow-md backdrop-blur border-1">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 underline-offset-8">Login</h2>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                            Email address
                        </label>
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full rounded-4xl border-gray-600 pl-12 px-5 py-3 shadow-xl/20 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>

                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                            Password
                        </label>
                        <div className='relative'>
                            <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <input
                                type={showpassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="mt-1 block w-full rounded-4xl border-gray-600 pl-12 px-5 py-3 shadow-xl/20 border-indigo-500 ring-indigo-500 sm:text-sm"
                                placeholder='Enter your password'
                            />
                            {/* toogle eye Icon */}
                            <button type='button'
                                onClick={() => setshowpassword(!showpassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                            >
                                {showpassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>

                    </div>

                    <div className='mb-8 text-left'>
                        <Link href={"/forgot"} className="text-md text-gray-500 hover:underline"> forgot password!</Link>
                    </div>

                    <div className="flex justify-center ">
           
                        <button type="submit" disabled={buttonDisabled || loading} className={`${buttonDisabled || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500'
                            } text-white font-semibold px-6 py-2 rounded-xl text-sm`}>
                            {loading? 'Logging in...':'Login'}
                        </button>
                    </div>

                    <div className='mb-4 mt-4 text-center text-sm text-gray-500'>
                        or continue with
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            type="button"
                            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                        >
                            <FcGoogle size={20} />
                            Google
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100 text-blue-600"
                        >
                            <FaFacebook size={20} />
                            Facebook
                        </button>
                    </div>

                    <div className='mt-4 flex text-left'>
                        <p>Dont have an account ? </p>
                        <Link href={"/signup"} className="text-md text-orange-500 hover:text-orange-800"> <span className='pl-2'> Sign Up</span></Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Page;
