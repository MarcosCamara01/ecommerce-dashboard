"use server";

import { db } from '@/lib/db';
import { Product } from '@/models/Products';
import { v2 as cloudinary } from 'cloudinary';
import Stripe from "stripe";

export const saveImage = async (formData: any) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const data = await formData;
        const image: any = data.get("image");

        if (!image) {
            return {
                error: 'No image found'
            }
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            }).end(buffer);
        })

        return {
            message: "Image saved",
            url: response.secure_url
        };

    } catch (error) {
        console.error('Failed to save image.', error);
        return { error: 'Failed to save image.', status: 500 };
    }
}

export const saveProduct = async (dataToSave: Product) => {
    console.log(dataToSave)
    try {
        db();

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2023-10-16',
        });

        const stripeProduct = await stripe.products.create({
            name: dataToSave.name,
            description: dataToSave.description,
            images: dataToSave.image,
            default_price_data: {
                unit_amount: dataToSave.price,
                currency: 'eur',
            },
            expand: ['default_price'],
            url: process.env.ECOMMERCE_URL + "/" + dataToSave.category
        });

        console.log(stripeProduct);

        const product = await Product.create(dataToSave);
        console.log(product);

        return product;
    } catch (error) {
        console.error('Failed to save product.', error);
        return { error: 'Failed to save product.', status: 500 };
    }
}