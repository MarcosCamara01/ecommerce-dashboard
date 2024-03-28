import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { saveImage, saveProduct } from '@/app/products/create/action';
import { Variant } from '@/models/Products';

const ProductForm: React.FC = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        sizes: ''
    });

    const [variants, setVariants] = useState<Variant[]>([]);
    const [variantImageUrls, setVariantImageUrls] = useState<string[][]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const uploadImages = async (e: ChangeEvent<HTMLInputElement>, callback: (newImageUrls: string[]) => void) => {
        try {
            setIsUploading(true);
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
            setIsUploading(false);

        } catch (error) {
            console.error('Failed to save the images.', error);
            setIsUploading(false);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        uploadImages(e, (newImageUrls: string[]) => {
            setImageUrls([...imageUrls, ...newImageUrls]);
        });
    };

    const handleVariantImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        uploadImages(e, (newImageUrls: string[]) => {
            const updatedVariants = [...variants];
            updatedVariants[index].images = newImageUrls;
            setVariants(updatedVariants);
            setVariantImageUrls((prevUrls: any) => [...prevUrls, ...newImageUrls]);
        });
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
        setVariantImageUrls([...variantImageUrls, []]);
    };

    const removeVariant = (index: number) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);

        const updatedVariantImageUrls = [...variantImageUrls];
        updatedVariantImageUrls.splice(index, 1);
        setVariantImageUrls(updatedVariantImageUrls);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const sizesArray = productData.sizes.split(',');

            const dataToSubmit = {
                ...productData,
                sizes: sizesArray,
                variants: variants,
                variantImages: variantImageUrls,
                image: imageUrls
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

    const inputBxStyles = "w-full flex flex-col items-center jusify-center gap-2.5";
    const labelStyles = "w-full text-sm";
    const inputStyles = "h-7 w-full bg-background-secondary border border-solid border-border-primary rounded";
    const buttonSyles = "py-1 px-3.5  border border-solid border-border-primary text-sm rounded bg-background-secondary transition duration-150 ease hover:bg-color-secondary";

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-full h-full max-w-md gap-5 jusify-center'>
            <div className={inputBxStyles}>
                <label className={labelStyles}>Name:</label>
                <input className={inputStyles} type="text" name="name" value={productData.name} onChange={handleInputChange} />
            </div>

            <div className={inputBxStyles}>
                <label className={labelStyles}>Description:</label>
                <textarea className="w-full max-w-full min-w-full border border-solid rounded max-h-52 bg-background-secondary border-border-primary" name="description" value={productData.description} onChange={handleInputChange} />
            </div>

            <div className={inputBxStyles}>
                <label className={labelStyles}>Price:</label>
                <input className={inputStyles} type="number" name="price" value={productData.price} onChange={handleInputChange} />
            </div>

            <div className={inputBxStyles}>
                <label className={labelStyles}>Category:</label>
                <input className={inputStyles} type="text" name="category" value={productData.category} onChange={handleInputChange} />
            </div>

            {variants.map((variant, index) => (
                <div key={index} className='w-full flex flex-col justify-center items-center gap-2.5'>
                    <div className={inputBxStyles}>
                        <label className={labelStyles}>Color:</label>
                        <input className={inputStyles}
                            type="text"
                            name="color"
                            value={variant.color}
                            onChange={(e) => handleVariantChange(e, index)}
                        />
                    </div>
                    <div className={inputBxStyles}>
                        <label className={labelStyles}>Variant Images:</label>
                        <input className={inputStyles}
                            type="file"
                            name="variantImages"
                            multiple
                            onChange={(e) => handleVariantImageChange(e, index)}
                            disabled={isUploading}
                        />
                    </div>

                    <button
                        type="button"
                        className={`${buttonSyles} mt-3.5`}
                        onClick={() => removeVariant(index)}
                    >Remove Variant
                    </button>
                </div>
            ))}


            <button className={buttonSyles} type="button" onClick={addVariant}>Add Variant</button>

            <div className={inputBxStyles}>
                <label className={labelStyles}>Sizes:</label>
                <input className={inputStyles} type="text" name="sizes" value={productData.sizes} onChange={handleInputChange} />
            </div>

            <div className={inputBxStyles}>
                <label className={labelStyles}>Main Image:</label>
                <input className={inputStyles} type="file" name="images" multiple onChange={handleImageChange} disabled={isUploading} />
            </div>

            <div className="image-preview-container">
                {imageUrls.map((url, index) => (
                    <div
                        key={index}
                        className="image-preview"
                    >
                        <Image
                            width={80}
                            height={120}
                            src={url}
                            alt={`Image ${index}`}
                        />
                    </div>
                ))}
            </div>
            {isUploading && <p>Uploading images...</p>}
            <button className={buttonSyles} type="submit" disabled={isUploading}>Create Product</button>
        </form>
    );
};

export default ProductForm;