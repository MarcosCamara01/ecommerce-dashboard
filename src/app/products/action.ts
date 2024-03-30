"use server";

import { db } from '@/lib/db';
import { Product } from '@/models/Products';
import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';

export const getProducts = async () => {
    await db();
    try {
        const products: Product[] = await Product.find();
        return products;
    } catch (error) {
        console.error('Error getting products:', error);
    }
}

export const deleteProduct = async (product: Product) => {
    await db();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2023-10-16',
    });

    try {
        for (const variant of product.variants) {
            const price = await stripe.prices.retrieve(variant.priceId);
            await stripe.products.update(
                price.product as string, {
                active: false
            });
        }
        await Product.findByIdAndDelete(product._id);
        revalidatePath("/products");
    } catch (error) {
        console.error('Error getting products:', error);
    }
}