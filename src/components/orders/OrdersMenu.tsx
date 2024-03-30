import React from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu
} from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";

const OrdersMenu = ({ receipt_url }: { receipt_url: string }) => {
    const receipt: string = JSON.parse(receipt_url);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <FiMoreHorizontal className="w-4 h-4" />
                    <span className="sr-only">Actions</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {
                    receipt ?
                        <DropdownMenuItem>
                            <Link className="w-full h-full" href={receipt} target="_blank">
                                View receipt
                            </Link>
                        </DropdownMenuItem>
                        : ""
                }
                <DropdownMenuItem>Customer details</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default OrdersMenu
