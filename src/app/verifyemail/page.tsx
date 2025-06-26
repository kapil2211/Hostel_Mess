'use client';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [verified, setVerified] = useState(false);
    const [status, setStatus] = useState("Verifying...")
    const [loading, setLoading] = useState(true);
    const verifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setStatus("Verified successfully");
            setVerified(true);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setStatus(error.response?.data?.message || "❌ Invalid or expired token.");
            } else {
                setStatus("❌ Something went wrong.");
            }
        }
        finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (token && token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className='text-4xl font-bold mb-5 '> Email Verification Status</h1>
            {loading ? (
                <div className='px-4 py-4 mt-5 max-w-sm bg-gray-200 rounded-xl'>
                    <div className='text-xl animate-pulse'> ⏳ Verifying your email...</div>
                </div>

            ) : (

                <div className='px-4 py-7 mt-5 max-w-sm bg-gray-200 rounded-xl'>
                    <h2 className="text-2xl font-bold mb-5">{status}</h2>
                    {verified && (
                        <Link href="/login" className="px-6 py-3  bg-orange-500 hover:bg-orange-600 transition text-white font-medium rounded-xl shadow-md">Login</Link>
                    )}
                </div>


            )}

        </div>
    );
};

export default Page;
