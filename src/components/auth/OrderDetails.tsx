"use client";

import React from 'react';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import Stripe from 'stripe';

const OrderDetails = ({ order }: { order: Stripe.Charge }) => {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{order.billing_details.name}</DialogTitle>
                <DialogDescription>
                    {order.billing_details.email}
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
                <p className='text-sm text-muted-foreground'>
                    {`${(order.amount / 100).toFixed(2)}€`}
                </p>
                <p className='text-sm text-muted-foreground'>
                    {new Date(order.created * 1000).toLocaleDateString()}
                </p>
                {
                    order.billing_details.phone &&
                    <p className='text-sm text-muted-foreground'>
                        {order.billing_details.phone}
                    </p>
                }
                <p className='text-sm text-muted-foreground'>
                    {order.billing_details.address ? (
                        `${order.billing_details.address.postal_code}, ${order.billing_details.address.line1}, ${order.billing_details.address.city}, ${order.billing_details.address.state}, ${order.billing_details.address.country}`
                    ) : (
                        'Address not available'
                    )}
                </p>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button
                        type="button"
                        className='bg-[#181818] hover:bg-[#18181BE6]'
                    >
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default OrderDetails;
