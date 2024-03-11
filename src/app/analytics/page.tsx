import Header from '@/components/common/Header';
import React from 'react';

export default async function Analytics() {
    return (
        <section className="w-full min-h-screen flex flex-col">
            <Header title={"Analytics"} />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="grid gap-6">
                    <div className="grid md:grid-cols-3 gap-6">

                    </div>
                </div>
            </main>
        </section>
    )
}