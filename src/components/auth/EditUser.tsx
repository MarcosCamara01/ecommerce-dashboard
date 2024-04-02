"use client";

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserDocument } from "@/models/PrivateUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function EditUser() {
    const [user, setUser] = useState<UserDocument>({} as UserDocument);
    const { data: session, update } = useSession();

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user as UserDocument);
        }
    }, [session]);
    
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue={session?.user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="col-span-3"
                    />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="Email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        defaultValue={session?.user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={() => {
                        update({ ...user });
                    }}
                        className='bg-[#181818] hover:bg-[#18181BE6]'
                >
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
