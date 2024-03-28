"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { saveImage, saveProduct } from '@/app/products/create/action';
import { Input } from "@/components/ui/input"
import { Variant } from '@/models/Products';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';

const CreateProduct: React.FC = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        sizes: '',
        image: []
    });
    const [variants, setVariants] = useState<Variant[]>([]);

    const uploadImages = async (e: ChangeEvent<HTMLInputElement>, callback: (newImageUrls: string[]) => void) => {
        try {
            const files = e.target.files;
            const newImageUrls: string[] = [];

            if (files) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const formData = new FormData();
                    formData.append("image", file);
                    const response = await saveImage(formData);
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        const urlParts = response.url.split('/');
                        newImageUrls.push(`/${urlParts[urlParts.length - 1]}`);
                    }
                }
            }

            callback(newImageUrls);
        } catch (error) {
            console.error('Failed to save the images.', error);
        }
    };

    const handleVariantImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedVariants = [...variants];
        updatedVariants[index].images = [e.target.value];
        setVariants(updatedVariants);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleVariantChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedVariants = [...variants];
        if (name === "color" || name === "priceId") {
            updatedVariants[index][name] = value;
            setVariants(updatedVariants);
        }
    };

    const addVariant = () => {
        setVariants([...variants, { priceId: '', color: '' }]);
    };

    const removeVariant = (index: number) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const sizesArray = productData.sizes.split(',');

            const dataToSubmit = {
                ...productData,
                sizes: sizesArray,
                variants: variants,
            };

            const response = await saveProduct(dataToSubmit);

            if (response.error) {
                console.error(response.error);
            } else {
                console.log(response)
                console.log('Product created successfully!');
            }
        } catch (error) {
            console.error('Failed to create product.', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col mx-auto px-6 py-10 w-full h-full max-w-md gap-5'
        >
            <div className="w-full flex flex-col gap-2.5">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={productData.name}
                    onChange={handleInputChange}
                />
            </div>

            <div className="w-full flex flex-col gap-2.5">
                <Textarea
                    className="max-h-52"
                    name="description"
                    placeholder="Type your description here."
                    value={productData.description}
                    onChange={handleInputChange}
                />
            </div>

            <div className="w-full flex flex-col gap-2.5">
                <Input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                />
            </div>

            <div className="w-full flex flex-col gap-2.5">
                <Input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={productData.category}
                    onChange={handleInputChange}
                />
            </div>

            {variants.map((variant, index) => (
                <div
                    key={index}
                    className='w-full flex flex-col gap-2.5'
                >
                    <div className="w-full flex flex-col gap-2.5">
                        <Input
                            placeholder='Color'
                            type="text"
                            name="color"
                            value={variant.color}
                            onChange={(e) => handleVariantChange(e, index)}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2.5">
                        <Label className='text-sm'>Variant Images:</Label>
                        <Input
                            type="file"
                            name="variantImages"
                            multiple
                            onChange={(e) => handleVariantImageChange(e, index)}
                        />
                    </div>

                    <Button
                        type="button"
                        variant="destructive"
                        className="my-3.5"
                        onClick={() => removeVariant(index)}
                    >
                        Remove Variant
                    </Button>
                </div>
            ))}


            <Button
                onClick={addVariant}
                type='button'
                className="mb-3.5 bg-[#181818] hover:bg-[#18181BE6]"
            >
                Add Variant
            </Button>

            <div className="w-full flex flex-col gap-2.5">
                <Input
                    type="text"
                    placeholder='Sizes'
                    name="sizes"
                    value={productData.sizes}
                    onChange={handleInputChange}
                />
            </div>

            <div className="w-full flex flex-col gap-2.5">
                <Label className='text-sm'>Main Image:</Label>
                <Input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                />
            </div>

            <Button
                type="submit"
                className="bg-[#181818] hover:bg-[#18181BE6]"
            >
                Create Product
            </Button>
        </form>
    );
};

export default CreateProduct;