import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";

export const userDb = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const MONGODB_URI = session?.user.mongodb_key;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not found");
  }

  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
