import mongoose, { model, Model, Schema } from 'mongoose';

export interface Product {
    sizes: string[];
    variants: Variant[];
    variantImages: string[][];
    image: string[];
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface Variant {
    priceId: string;
    color: string;
    images?: string[];
}

const VariantsSchema = new Schema<Variant>({
    priceId: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
});

const ProductSchema: Schema = new Schema<Product>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String],
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    variants: {
        type: [VariantsSchema],
        required: true,
    },
});
export const Product = (mongoose.models.Product || model('Product', ProductSchema)) as Model<any>;
