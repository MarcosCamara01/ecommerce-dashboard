"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
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
        <div className="sm:max-w-[425px] h-full p-5 flex flex-col justify-center mx-auto">
            <div className="grid gap-4 py-4 min-w-[300px]">
                <Input
                    id="name"
                    placeholder='Name'
                    className="col-span-3"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <Input
                    id="email"
                    placeholder='Email'
                    className="col-span-3"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Input
                    id="password"
                    placeholder='Password'
                    type='password'
                    className="col-span-3"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </div>
            <Button
                onClick={createUser}
                className='bg-[#181818] hover:bg-[#18181BE6]'
                type="submit"
            >
                Save changes
            </Button>
        </div>
    )
}

export default CreateUser
