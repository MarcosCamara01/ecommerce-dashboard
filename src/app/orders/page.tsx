import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from "@/components/ui/table";
import Header from "@/components/common/Header";
import { getOrders } from "../action";
import dynamic from "next/dynamic";

const OrdersMenu = dynamic(() => import('../../components/orders/OrdersMenu'), {
    ssr: false,
});

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
                                <TableHead className="min-w-[150px] text-center">Customer</TableHead>
                                <TableHead className="hidden md:table-cell text-center">Date</TableHead>
                                <TableHead className="min-w-[100px] text-center">Total</TableHead>
                                <TableHead className="hidden sm:table-cell text-center">Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell className="text-center">{order.billing_details.name}</TableCell>
                                    <TableCell className="hidden md:table-cell text-center">{new Date(order.created * 1000).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-center">
                                        {`${(order.amount / 100).toFixed(2)}€`}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-center">{order.status}</TableCell>
                                    <TableCell className="text-right h-[73px]">
                                        <OrdersMenu receipt_url={JSON.stringify(order.receipt_url)} />
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