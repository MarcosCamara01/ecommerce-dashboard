"use client"

import React from 'react';
import { signOut } from "next-auth/react";

export const Logout = () => {
    return (
        <button
            className="text-sm text-gray-500 transition duration-150 ease hover:text-black"
            onClick={() => {
                signOut();
            }}
        >
            Log out
        </button>
    )
}
