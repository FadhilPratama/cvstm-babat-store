'use client'

import { Image as ImageType } from "@/type";
import Image from "next/image";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";

interface GalleryProps {
    images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    return (
        <TabGroup as="div" className="flex flex-col">
            {/* Main Image Panel */}
            <TabPanels className="relative aspect-square w-full mb-6 bg-gray-50 rounded-lg overflow-hidden">
                {images.map((image) => (
                    <TabPanel key={image.id} className="h-full w-full">
                        <div className="relative h-full w-full flex items-center justify-center p-8">
                            <Image
                                src={image.url}
                                alt="Product image"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                    </TabPanel>
                ))}
            </TabPanels>

        </TabGroup>
    );
};

export default Gallery;