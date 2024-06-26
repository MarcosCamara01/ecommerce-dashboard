import Link from 'next/link'
import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import dynamic from 'next/dynamic';

const EditUser = dynamic(() => import('../auth/EditUser'), {
    ssr: false,
});

const SignOutButton = dynamic(() => import('../auth/SignOutButton'), {
    ssr: false,
});

const Header = async ({ title }: { title: string }) => {
    const session: Session | null = await getServerSession(authOptions);
    const firstLetter = (session?.user?.name?.charAt(0) || '').toUpperCase();

    return (
        <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b border-solid border-gray-200 px-6'>
            <Link className="lg:hidden" data-id="17" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" data-id="18">
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>
                <span className="sr-only" data-id="19">Home</span>
            </Link>
            <div className="w-full flex-1" data-id="20">
                <h1 className="font-semibold text-sm md:text-base lg:text-xl" data-id="21">{title}</h1>
            </div>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="rounded-full overflow-hidden w-[32px] h-[32px] border border-gray-200"
                            size="icon"
                            variant="ghost"
                        >
                            {firstLetter}
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            session?.user?.email === "marcospenelascamara@gmail.com" ?
                                <DropdownMenuItem>
                                    <Link href="/new-user" className='w-full h-full text-left'>
                                        New user
                                    </Link>
                                </DropdownMenuItem>
                                : ""
                        }
                        <DropdownMenuItem>
                            <DialogTrigger asChild>
                                <button className='w-full h-full text-start'>
                                    Edit profile
                                </button>
                            </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <SignOutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <EditUser />
            </Dialog>
        </header>
    )
}

export default Header
