'use client'

import React, { useState } from 'react';
import Image, { ImageLoader } from 'next/image';
import { Skeleton } from '../ui/skeleton';

const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
    const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
    const normalizeSrc = (src: string) => (src[0] === '/' ? src.slice(1) : src);

    return `https://res.cloudinary.com/dckjqf2cq/image/upload/${params.join(',')}/${normalizeSrc(src)}`;
};

export const Images = (
    { src, name, width, height, priority }:
        { src: string[], name: string, width: number, height: number, priority: boolean }
) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoadComplete = () => {
        setImageLoaded(true);
    };

    return (
        <div className={!imageLoaded ? 'relative' : ''}>
            <Image
                loader={cloudinaryLoader}
                width={width}
                height={height}
                src={src[0]}
                alt={name}
                priority={priority}
                className="w-full max-w-img aspect-[2/3] brightness-90 rounded-md object-cover"
                onLoad={handleImageLoadComplete}
            />
            <div className={!imageLoaded ? 'absolute top-0 right-0 w-full aspect-[2/3] bg-black' : 'hidden'}>
                <Skeleton className="w-full aspect-[2/3] rounded-b-none" />
            </div>
        </div>
    )
}
