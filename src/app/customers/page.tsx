import React, { Suspense } from 'react';
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from "@/components/ui/table";
import Header from '@/components/common/Header';
import { getCustomers } from '../action';
import { Loader } from '@/components/common/Loader';

export default async function Customers() {
    return (
        <section className="w-full min-h-screen flex flex-col">
            <Header title={"Customers"} />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Suspense fallback={<Loader width={30} height={30} />}>
                    <CustomersTable />
                </Suspense>
            </main>
        </section>
    );
}

const CustomersTable = async () => {
    const customers = await getCustomers();

    return (
        <div className="border shadow-sm rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Location</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>
                                    {customer.address ? (
                                        `${customer.address.postal_code}, ${customer.address.line1}, ${customer.address.city}, ${customer.address.state}, ${customer.address.country}`
                                    ) : (
                                        'Address not available'
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
