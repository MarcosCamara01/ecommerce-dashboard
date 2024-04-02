import Header from '@/components/common/Header';
import React from 'react';
import { calculateBuyersPerMonth, calculateEarningsPerMonth, totalBalance } from '../action';
import StackedbarChart from '@/components/analytics/Charts';
import {
    CardDescription,
    CardTitle,
    CardHeader,
    CardContent,
    Card
} from "@/components/ui/card";

export default async function Analytics() {
    const earnings = await calculateEarningsPerMonth();
    const buyers = await calculateBuyersPerMonth();
    const balance = await totalBalance();

    let totalBuyers = 0;
    for (const key in buyers) {
        totalBuyers += buyers[key];
    }

    return (
        <section className="w-full min-h-screen flex flex-col">
            <Header title={"Analytics"} />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardDescription>Total Sales</CardDescription>
                                <CardTitle>{balance.toFixed(2)} €</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <StackedbarChart
                                    dataString={JSON.stringify(earnings)}
                                    dataType="sales"
                                />
                            </CardContent>
                        </Card>
                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardDescription>Total Buyers</CardDescription>
                                <CardTitle>{totalBuyers} Buyers in total</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <StackedbarChart
                                    dataString={JSON.stringify(buyers)}
                                    dataType="buyers"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </section>
    )
}