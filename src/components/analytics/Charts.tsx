"use client"

import React from 'react';
import { ResponsiveBar } from "@nivo/bar";

type DataType = {
    [key: string]: number;
};

type Props = {
    dataString: string;
    dataType: 'sales' | 'buyers';
};

const StackedbarChart: React.FC<Props> = ({ dataString, dataType }) => {
    const data: DataType = JSON.parse(dataString);

    const dataFormatted = Object.entries(data).map(([date, value]) => ({
        date,
        [dataType]: parseFloat(value.toFixed(2))
    }));

    return (
        <div className='aspect-[4/3]'>
            <ResponsiveBar
                data={dataFormatted}
                keys={[dataType]}
                indexBy="date"
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                padding={0.3}
                colors={["#181818"]}
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
                tooltipLabel={({ id }) => `${id} ${dataType === "sales" ? "(euros)" : ""}`}
                enableLabel={false}
                role="application"
                ariaLabel="A stacked bar chart"
            />
        </div>
    );
};

export default StackedbarChart;