"use client";

import React, { FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from 'axios';

const CreateUser = () => {
    const createUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, {
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
            });
            
            console.log(response);
        } catch (error: any) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data.message);
                alert(error.response?.data.message);
            } else {
                console.error(error);
                alert(error);
            }
        }
    };

    return (
        <form
            className="sm:max-w-[425px] h-full p-5 flex flex-col justify-center mx-auto"
            onSubmit={createUser}
        >
            <div className="grid gap-4 py-4 min-w-[300px]">
                <Input
                    id="name"
                    placeholder='Name'
                    name="name"
                    className="col-span-3"
                />
                <Input
                    id="email"
                    placeholder='Email'
                    name="email"
                    className="col-span-3"
                />
                <Input
                    id="password"
                    placeholder='Password'
                    name="password"
                    type='password'
                    className="col-span-3"
                />
            </div>
            <Button
                className='bg-[#181818] hover:bg-[#18181BE6]'
                type="submit"
            >
                Save changes
            </Button>
        </form>
    )
}

export default CreateUser
