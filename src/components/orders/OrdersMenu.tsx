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
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from 'next/dynamic';
import Stripe from 'stripe';

const OrderDetails = dynamic(() => import('../auth/OrderDetails'), {
    ssr: false,
});

const OrdersMenu = ({ orderString }: { orderString: string }) => {
    const order: Stripe.Charge = JSON.parse(orderString);

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <FiMoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {
                        order.receipt_url ?
                            <DropdownMenuItem>
                                <Link className="w-full h-full" href={order.receipt_url} target="_blank">
                                    View receipt
                                </Link>
                            </DropdownMenuItem>
                            : ""
                    }
                    <DropdownMenuItem>
                        <DialogTrigger asChild>
                            <button className='w-full h-full text-start'>
                                Customer details
                            </button>
                        </DialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <OrderDetails order={order} />
        </Dialog>
    )
}

export default OrdersMenu
