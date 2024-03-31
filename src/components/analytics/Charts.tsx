"use client"

import React from 'react';
import { ResponsiveBar } from "@nivo/bar";

export default function StackedbarChart({ dataSting }: { dataSting: string }) {
    const order: { [key: string]: number } = JSON.parse(dataSting);

    const orderData = Object.entries(order).map(([date, price]) => ({
        date,
        sales: parseFloat(price.toFixed(2))
    }));

    return (
        <div className='aspect-[4/3]'>
            <ResponsiveBar
                data={orderData}
                keys={["sales"]}
                indexBy="date"
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                padding={0.3}
                colors={["#2563eb"]}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                    tickRotation: -45,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                tooltipLabel={({ id }) => `${id} (euros)`}
                enableLabel={false}
                role="application"
                ariaLabel="A stacked bar chart"
            />
        </div>
    )
}
