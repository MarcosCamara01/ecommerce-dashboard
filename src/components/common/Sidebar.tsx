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
            href: '/orders',
            activeSegment: 'orders',
            icon: <FaShoppingCart className="h-4 w-4" />
        },
        {
            title: 'Products',
            href: '/products',
            activeSegment: 'products',
            icon: <FiPackage className="h-4 w-4" />
        },
        {
            title: 'Customers',
            href: '/customers',
            activeSegment: 'customers',
            icon: <LuUsers className="h-4 w-4" />
        },
        {
            title: 'Analytics',
            href: '/analytics',
            activeSegment: 'analytics',
            icon: <FaChartLine className="h-4 w-4" />
        },
    ];

    const activeSegment = useSelectedLayoutSegment()

    return (
        <div className='flex flex-col h-full p-3'>
            <nav className="w-full hidden lg:flex flex-col gap-1">
                {items.map((item) => (
                    <Link
                        key={item.activeSegment}
                        href={item.href}
                        className={
                            activeSegment === item.activeSegment
                                ? 'flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                                : 'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}
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
