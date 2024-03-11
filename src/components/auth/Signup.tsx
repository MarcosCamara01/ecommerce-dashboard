"use client";

import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { BiLogoGoogle } from 'react-icons/bi';
import { BiSolidShow } from 'react-icons/bi';
import { BiSolidHide } from 'react-icons/bi';

const Signup = () => {
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            window.location.reload();
        }
    }, [session]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const signupResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, {
                email: formData.get("email"),
                password: formData.get("password"),
                name: formData.get("name"),
            });

            const res = await signIn("credentials", {
                email: signupResponse.data.email,
                password: formData.get("password"),
                redirect: false,
            });

        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            }
        }
    };

    return (
        <section className="flex items-center justify-center w-full h-screen px-4">
            <form
                onSubmit={handleSubmit}
                className="p-6 xs:p-10 w-full max-w-[350px] flex flex-col justify-between items-center gap-2.5	
                bg-white rounded text-black"
            >
                {error && <div className="">{error}</div>}
                <h1 className="w-full my-5 text-2xl font-bold">Create an account</h1>

                <input
                    type="text"
                    placeholder="Fullname"
                    className="w-full h-10 border border-solid border-[#4D4D4F] py-2 px-3 rounded bg-white text-[13px] focus:outline-none focus:border-[#4D4D4F]"
                    name="name"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-10 mt-2.5 border border-solid border-[#4D4D4F] py-2 px-3 rounded bg-white text-[13px] focus:outline-none focus:border-[#4D4D4F]"
                    name="email"
                />

                <div className="flex w-full mt-2.5">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full h-10 border border-solid border-[#4D4D4F] py-2 px-3 rounded-l bg-white text-[13px] focus:outline-none focus:border-[#4D4D4F]"
                        name="password"
                    />
                    <button
                        className="w-2/12	border-y border-r border-solid border-[#4D4D4F] bg-white rounded-r 
                        flex items-center justify-center transition duration-150 ease hover:bg-[#202123]"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword)
                        }}
                    >
                        {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                    </button>
                </div>

                <button className="w-full h-10 bg-[#181818] text-white border border-solid border-[#4D4D4F] py-2 px-3 mt-4 rounded
                        transition duration-150 ease hover:bg-[#18181BE6] text-[13px]"
                >
                    Signup
                </button>

                <div className="relative flex items-center justify-center w-full h-10">
                    <div className="absolute h-px w-full top-2/4 bg-gray-400"></div>
                    <p className="w-8 h-6 bg-white text-gray-900 z-10 text-xs flex items-center justify-center">OR</p>
                </div>

                <button
                    className="w-full h-10 justify-center flex py-1.5 px-4 text-sm align-middle items-center rounded text-999 bg-[#F4F4F5]  
                    transition duration-150 ease hover:bg-gray-200 gap-3"
                    onClick={(e) => {
                        e.preventDefault();
                        signIn("google")
                    }}>
                    <BiLogoGoogle className="text-2xl" /> Sign in with Google
                </button>

                <Link href="/login" className="text-sm	text-gray-500 transition duration-150 ease hover:text-black">
                    Already have an account?
                </Link>
            </form>
        </section>
    );
}

export default Signup;
