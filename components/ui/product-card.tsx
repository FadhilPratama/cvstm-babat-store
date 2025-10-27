'use client'

import { Product } from "@/type";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand } from "lucide-react";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import { MouseEventHandler } from "react";

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const previewModal = usePreviewModal();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data.id}`);
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white group cursor-pointer rounded-xl border border-gray-200 p-4 space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            {/* Image Container with Action Overlay */}
            <div className="aspect-square rounded-xl bg-gray-50 relative overflow-hidden">
                {data?.images?.[0]?.url ? (
                    <Image
                        src={data.images[0].url}
                        alt={data.name || "Product image"}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-sm">No Image</span>
                    </div>
                )}

                {/* Action Button Overlay */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={18} className="text-white" />}
                            className="bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Product Information */}
            <div className="space-y-2">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
                    {data.name}
                </h3>
                {data.category?.name && (
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {data.category.name}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;