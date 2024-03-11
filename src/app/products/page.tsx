import React from 'react';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FiMoreHorizontal } from "react-icons/fi";
import Header from '@/components/common/Header';
import { getProducts } from '../action';
import Image from 'next/image';

export default async function Products() {
    const products = await getProducts();

    return (
        <section className="w-full min-h-screen flex flex-col">
            <Header title={"Products"} />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="border shadow-sm rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead className="max-w-[150px]">Name</TableHead>
                                <TableHead className="hidden md:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Created</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <Image
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height={48}
                                                width={48}
                                                src={product.images[0]}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">{product.active ? "Active" : "Inactive"}</TableCell>
                                        <TableCell>{new Date(product.created * 1000).toLocaleDateString()}</TableCell>
                                        <TableCell className="hidden md:table-cell">{new Date(product.updated * 1000).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost">
                                                        <FiMoreHorizontal className="w-4 h-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit product</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete product</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </section>
    )
}

