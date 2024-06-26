"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { BiSolidShow } from 'react-icons/bi';
import { BiSolidHide } from 'react-icons/bi';
import { toast } from "sonner";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      window.location.reload();
    }
  }, [session]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error as string)
    };
  };

  return (
    <section className="flex items-center justify-center w-full h-screen px-4">
      <form
        className="p-6 xs:p-10	w-full max-w-[350px] flex flex-col justify-between items-center gap-2.5	
         bg-white rounded text-black"
        onSubmit={handleSubmit}
      >
        <h1 className="w-full my-5 text-2xl font-bold">Welcome back</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full h-10 border border-solid border-[#4D4D4F] py-2 px-3 rounded bg-white text-[13px] focus:outline-none focus:border-[#4D4D4F]"
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
          flex items-center justify-center transition duration-150 ease hover:bg-[#F4F4F5]"
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
          Sign in
        </button>
        <Link href="/register" className="text-sm	text-gray-500 transition duration-150 ease hover:text-black">
          Don&apos;t have an account?
        </Link>
      </form>
    </section>
  );
}

export default Signin;
