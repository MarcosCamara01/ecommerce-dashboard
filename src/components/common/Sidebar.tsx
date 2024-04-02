"use client"

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';
import { FaShoppingCart, FaChartLine } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

const Sidebar = () => {
    const items = [
        {
            title: 'Orders',
            name: 'orders',
            icon: <FaShoppingCart className="h-4 w-4" />
        },
        {
            title: 'Products',
            name: 'products',
            icon: <FiPackage className="h-4 w-4" />
        },
        {
            title: 'Customers',
            name: 'customers',
            icon: <LuUsers className="h-4 w-4" />
        },
        {
            title: 'Analytics',
            name: 'analytics',
            icon: <FaChartLine className="h-4 w-4" />
        },
    ];

    const activeSegment = useSelectedLayoutSegment()

    return (
        <div className='flex flex-col h-full p-3 border-b lg:border-r border-solid border-gray-200'>
            <nav className="w-full lg:sticky lg:top-3 flex flex-col gap-1">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={"/" + item.name}
                        className={
                            activeSegment === item.name
                                ? 'flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 transition-all'
                                : 'flex items-center gap-3 rounded-lg px-3 py-2 text-[#64748B] transition-all hover:text-[#181818] hover:bg-gray-100'}
                    >
                        {item.icon}
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar
