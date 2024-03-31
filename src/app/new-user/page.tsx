import CreateUser from '@/components/auth/CreateUser';
import Header from '@/components/common/Header';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";
import { redirect } from 'next/navigation';

const NewUser = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (session?.user.email === "marcospenelascamara@gmail.com") {
        return (
            <section className="w-full min-h-screen flex flex-col">
                <Header title={"Create user"} />
                <CreateUser />
            </section>
        )
    } else {
        redirect("/orders");
    }
}

export default NewUser;
