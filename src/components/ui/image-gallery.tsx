'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogClose,
} from '@/components/ui/dialog';

export function ImageGallery() {
	// Auto-import images from local assets
	const galleryImports = import.meta.glob('../../assets/gallery/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
		eager: true,
		query: '?url',
		import: 'default'
	});

	const artImages = Object.entries(galleryImports)
		.map(([path, module]) => {
			const filename = path.split('/').pop()?.toLowerCase() || '';
			const isVertical = filename.includes('vertical');
			const isFramed = filename.includes('framed');
			return {
				src: module as string,
				alt: filename,
				isVertical,
				isFramed,
				path
			};
		})
		.sort((a, b) => a.path.localeCompare(b.path));

	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center py-10 px-4">
			{artImages.length === 0 ? (
				<div className="text-center p-10 border-2 dashed border-gray-300 rounded-xl">
					<p className="text-muted-foreground">No images found in <code className="bg-muted px-1 py-0.5 rounded">src/assets/gallery</code></p>
					<p className="text-sm text-muted-foreground mt-2">Add images with "vertical" in the filename for tall layout.</p>
				</div>
			) : (
				<div className="mx-auto grid w-full max-w-5xl gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] grid-flow-dense">
					{artImages.map((image) => (
						<div
							key={image.path}
							className={cn(
								"cursor-pointer overflow-hidden rounded-[12px] transition-transform duration-300 hover:scale-[1.02]",
								image.isVertical ? "row-span-2" : "row-span-1"
							)}
							onClick={() => setSelectedImage(image.src)}
						>
							<AnimatedImage
								alt={image.alt}
								src={image.src}
								className="h-full w-full"
								imgClassName={cn(
									image.isFramed && "scale-[2.0]"
								)}
							/>
						</div>
					))}
				</div>
			)}

			<Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
				<DialogContent className="max-w-[90vw] max-h-[90vh] bg-transparent border-none shadow-none p-0 flex items-center justify-center [&>button]:hidden">
					<div className="absolute top-4 left-4 z-50">
						<DialogClose asChild>
							<Button variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white">
								<ChevronLeft className="h-4 w-4" />
							</Button>
						</DialogClose>
					</div>
					<DialogTitle className="sr-only">Image Lightbox</DialogTitle>
					{selectedImage && (
						<div className="relative w-full h-full flex items-center justify-center">
							<img
								src={selectedImage}
								alt="Full screen art"
								className="max-w-full max-h-[90vh] object-contain rounded-md"
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

interface AnimatedImageProps {
	alt: string;
	src: string;
	className?: string;
	imgClassName?: string;
	placeholder?: string;
}

function AnimatedImage({ alt, src, placeholder, className, imgClassName }: AnimatedImageProps) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });
	const [isLoading, setIsLoading] = React.useState(true);

	const [imgSrc, setImgSrc] = React.useState(src);

	const handleError = () => {
		if (placeholder) {
			setImgSrc(placeholder);
		}
	};

	return (
		<div
			ref={ref}
			className={cn("bg-accent relative size-full rounded-[12px]", className)}
		>
			<img
				alt={alt}
				src={imgSrc}
				className={cn(
					'size-full rounded-[12px] object-cover object-center transition-opacity duration-1000 ease-in-out',
					{
						'opacity-0': isLoading || !isInView,
						'opacity-100': isInView && !isLoading,
					},
					imgClassName
				)}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
				onError={handleError}
			/>
		</div>
	);
}

