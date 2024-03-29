import { db } from '@/lib/db';
import { Product } from '@/models/Products';

export const getProducts = async () => {
    try {
        await db();

        const products: Product[] = await Product.find();
        return products;
    } catch (error) {
        console.error('Error getting products:', error);
    }
}