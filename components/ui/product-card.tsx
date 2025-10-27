'use client';

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
            className="
        bg-white
        group
        cursor-pointer
        rounded-2xl
        border
        border-gray-100
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
        >
            {/* Gambar Produk */}
            <div className="relative w-full aspect-[4/5] bg-gray-50">
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

                {/* Tombol Preview (muncul saat hover) */}
                <div className="
          absolute inset-0
          flex items-center justify-center
          bg-black/10
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        ">
                    <IconButton
                        onClick={onPreview}
                        icon={<Expand size={18} className="text-white" />}
                        className="bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm"
                    />
                </div>
            </div>

            {/* Info Produk */}
            <div className="px-4 py-3 space-y-1 text-center">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2 leading-snug">
                    {data.name}
                </h3>
                {data.category?.name && (
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                        {data.category.name}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
