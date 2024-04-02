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
import Link from 'next/link';
import { getProducts } from './action';
import { Images } from '@/components/products/Images';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/common/Loader';

const ProductMenu = dynamic(() => import('../../components/products/ProductMenu'), {
    ssr: false,
});

export default async function Products() {
    return (
        <section className="w-full min-h-screen flex flex-col">
            <Header title={"Products"} />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Link
                    href="/products/create"
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-[#181818] hover:bg-[#18181BE6]'
                >
                    New product
                </Link>

                <Suspense fallback={<Loader width={30} height={30} />}>
                    <AllProducts />
                </Suspense>
            </main>
        </section >
    )
}

const AllProducts = async () => {
    const products = await getProducts();

    return (
        <>
            {
                products?.length === 0 ?
                    <h3 className='text-center'>No products yet</h3>
                    :
                    <div className="border shadow-sm rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px] text-center">Image</TableHead>
                                    <TableHead className="max-w-[150px]">Name</TableHead>
                                    <TableHead className="text-center hidden md:table-cell">Price</TableHead>
                                    <TableHead className="text-center hidden md:table-cell">Variants</TableHead>
                                    <TableHead className='text-center'>Sizes</TableHead>
                                    <TableHead className='text-center'>Category</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products?.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Images
                                                src={product.image}
                                                name={product.name}
                                                width={48}
                                                height={72}
                                                priority={index === 0 ? true : false}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell className="hidden text-center md:table-cell">{product.price}€</TableCell>
                                        <TableCell className='text-center'>{product.variants.length}</TableCell>
                                        <TableCell className='text-center'>
                                            {product.sizes.join(', ')}
                                        </TableCell>
                                        <TableCell className="text-center hidden md:table-cell">{product.category}</TableCell>
                                        <TableCell className="text-right">
                                            <ProductMenu productString={JSON.stringify(product)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
            }
        </>
    )
}
