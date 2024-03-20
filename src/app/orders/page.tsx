import { Button } from "@/components/ui/button";
import {
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu
} from "@/components/ui/dropdown-menu";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from "@/components/ui/table";
import { FiMoreHorizontal } from "react-icons/fi";
import Header from "@/components/common/Header";
import { getOrders } from "../action";
import Link from "next/link";

export default async function Orders() {
    const orders = await getOrders();

    return (
        <section className="w-full min-h-screen flex flex-col">
            <Header title={"Orders"} />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="border shadow-sm rounded-lg p-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Order Number</TableHead>
                                <TableHead className="min-w-[150px]">Customer</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="min-w-[100px]">Total</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.billing_details.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{new Date(order.created * 1000).toLocaleDateString()}</TableCell>
                                    <TableCell>{`${(order.amount / 100).toFixed(2)}€`}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{order.status}</TableCell>
                                    <TableCell className="text-right">
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
                                                <DropdownMenuItem>Customer details</DropdownMenuItem>
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
    );
}
