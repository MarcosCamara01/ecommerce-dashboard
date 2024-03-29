"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { saveProduct } from '@/app/products/create/action';
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { toast } from 'sonner';

const CreateProduct: React.FC = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        sizes: '',
        image: null as FormData | null
    });

    const [variants, setVariants] = useState([
        { priceId: "", color: "", images: [null as FormData | null] }
    ]);

    const handleVariantImageChange = (e: ChangeEvent<HTMLInputElement>, variantIndex: number) => {
        const updatedVariants = [...variants];
        const files = e.target.files;

        if (files) {
            const formDataArray: FormData[] = [];

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('image', files[i]);
                formDataArray.push(formData);
            }

            updatedVariants[variantIndex].images = formDataArray;
            setVariants(updatedVariants);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0];
            const formData = new FormData();
            if (file) {
                formData.append('image', file);
            }
            setProductData((prevData) => ({
                ...prevData,
                image: formData,
            }));
        } else {
            setProductData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
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
        setVariants([...variants, { priceId: '', color: '', images: [] }]);
    };

    const removeVariant = (index: number) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const sizesArray = productData.sizes.split(',');

        const dataToSubmit = {
            ...productData,
            sizes: sizesArray,
            variants: variants,
        };

        const response = await saveProduct(dataToSubmit);

        console.log(response)

        if (response.error) {
            console.error(response.error);
            toast.error(response.error);
        } else {
            console.log(response.message);
            toast.info(response.message);
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
                        <Label className='text-sm'>Variant Images (3):</Label>
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