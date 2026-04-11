'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AppImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    fill?: boolean;
    sizes?: string;
    onClick?: () => void;
    fallbackSrc?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
    [key: string]: any;
}

function AppImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    quality = 75,
    placeholder = 'empty',
    blurDataURL,
    fill = false,
    sizes,
    onClick,
    fallbackSrc = '/assets/images/no_image.png',
    fetchPriority,
    ...props
}: AppImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const isExternal = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');
    const isLocal = imageSrc.startsWith('/') || imageSrc.startsWith('./') || imageSrc.startsWith('data:');

    const handleError = () => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
    };

    const interactionClass = onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : '';
    const commonClassName = `${className} ${interactionClass}`.trim();

    const resolvedFetchPriority = fetchPriority ?? (priority ? 'high' : undefined);

    if (isExternal && !isLocal) {
        return (
            <img
                src={imageSrc}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={resolvedFetchPriority}
                className={commonClassName}
                onError={handleError}
                onClick={onClick}
                {...props}
            />
        );
    }

    if (fill) {
        return (
            <Image
                src={imageSrc}
                alt={alt}
                fill
                sizes={sizes || '100vw'}
                priority={priority}
                quality={quality}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                fetchPriority={resolvedFetchPriority}
                className={commonClassName}
                onError={handleError}
                onClick={onClick}
                {...props}
            />
        );
    }

    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={width || 400}
            height={height || 300}
            sizes={sizes}
            priority={priority}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            fetchPriority={resolvedFetchPriority}
            className={commonClassName}
            onError={handleError}
            onClick={onClick}
            {...props}
        />
    );
}

export default AppImage;
