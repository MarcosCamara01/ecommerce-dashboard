import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { redirect } from 'next/navigation';
import Signin from '@/components/auth/Signin';

const Login = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  } else {
    return (
      <Signin />
    )
  }
}

export default Login;
