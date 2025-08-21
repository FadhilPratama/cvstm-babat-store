'use client'

import { Image as ImageType } from "@/type";
import Image from "next/image";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import GalleryTab from "@/components/gallery/gallery-tab";

interface GalleryProps {
    images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    return (
        <TabGroup as="div" className="flex flex-col">
            {/* Main Image Panel */}
            <TabPanels className="aspect-square w-full mb-6">
                {images.map((image) => (
                    <TabPanel key={image.id}>
                        <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                            <Image
                                src={image.url}
                                alt="Product image"
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </TabPanel>
                ))}
            </TabPanels>

            {/* Thumbnail Gallery */}
            <div className="mx-auto w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                    {images.map((image) => (
                        <GalleryTab key={image.id} image={image} />
                    ))}
                </TabList>
            </div>
        </TabGroup>
    );
};

export default Gallery;