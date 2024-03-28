"use client";

import React, { useState } from 'react';
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserDocument } from '@/models/User';
import axios from 'axios';

const CreateUser = () => {
    const [user, setUser] = useState<UserDocument>({} as UserDocument);

    const createUser = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, user);
            if (response.status !== 200) {
                console.error(response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>New user</DialogTitle>
                <DialogDescription>
                    Create a user here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        className="col-span-3"
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        className="col-span-3"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type='password'
                        className="col-span-3"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    onClick={createUser}
                    className='bg-[#181818] hover:bg-[#18181BE6]'
                    type="submit"
                >
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default CreateUser
