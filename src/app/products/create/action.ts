"use server";

import { db } from '@/lib/db';
import { Product } from '@/models/Products';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import Stripe from "stripe";

export const saveImage = async (formData: any) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return {
            error: 'Missing Cloudinary configuration',
            status: 500
        };
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!(formData instanceof FormData)) {
            return {
                error: 'Invalid FormData object',
                status: 400
            };
        }

        const image = formData.get("image");

        if (!image) {
            return {
                error: 'No image found',
                status: 400
            };
        }

        const blob = new Blob([image]);
        const bytes = await blob.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (err, result) => {
                if (err) {
                    console.error('Error uploading image to Cloudinary:', err);
                    reject(err);
                }
                resolve(result);
            }).end(buffer);
        });

        if (!response || !response.secure_url) {
            return {
                error: 'Failed to upload image to Cloudinary',
                status: 500
            };
        }

        return response.secure_url;

    } catch (error) {
        console.error('Failed to save image.', error);
        return { error: 'Failed to save image.', status: 500 };
    }
}

export const saveProduct = async (dataToSave: any) => {
    try {
        await db();

        const mainImageUrls = await saveImage(dataToSave.image);

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2023-10-16',
        });

        const createdVariants = [];

        for (const variant of dataToSave.variants) {
            const variantImageUrls = await Promise.all(variant.images.map(async (image: any) => {
                return await saveImage(image);
            }));

            const variantImages = variantImageUrls.map((imageUrl: string) => "/" + imageUrl.split('/').pop());

            const stripeVariant = await stripe.products.create({
                name: `${dataToSave.name} - ${variant.color}`,
                description: `${dataToSave.description} - ${variant.color}`,
                images: [mainImageUrls],
                default_price_data: {
                    unit_amount: parseFloat(dataToSave.price.replace('.', '')),
                    currency: 'eur',
                },
                expand: ['default_price'],
            });

            if (stripeVariant?.default_price) {
                createdVariants.push({
                    priceId: (stripeVariant.default_price as any).id,
                    color: variant.color,
                    images: variantImages,
                });
            }
        }

        const mainImage = mainImageUrls.split('/').pop();

        await Product.create({
            name: dataToSave.name,
            description: dataToSave.description,
            price: dataToSave.price,
            category: dataToSave.category,
            sizes: dataToSave.sizes,
            image: "/" + mainImage,
            variants: createdVariants,
        });

        revalidatePath("/products");

        return { message: 'Product saved successfully.', status: 200 };

    } catch (error) {
        console.error('Failed to save product.', error);
        return { error: 'Failed to save product.', status: 500 };
    }
}
