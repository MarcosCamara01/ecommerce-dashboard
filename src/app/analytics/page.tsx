import Header from '@/components/common/Header';
import React from 'react';
import { calculateEarningsPerMonth } from '../action';
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

    let totalSales = 0;
    for (const key in earnings) {
        totalSales += earnings[key];
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
                                <CardTitle>{totalSales.toFixed(2)} €</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <StackedbarChart
                                    dataSting={JSON.stringify(earnings)}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </section>
    )
}