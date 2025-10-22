"use client";

import { useEffect, useState, useMemo } from "react";
import { Product } from "@/type";
import { Button } from "@/components/ui/button";
import {
    MessageCircleIcon,
    PackageIcon,
    FlaskConicalIcon,
    InfoIcon,
} from "lucide-react";
import Link from "next/link";

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined" && data?.id) {
            setUrl(`${window.location.origin}/product/${data.id}`);
        }
    }, [data?.id]);

    const telp = process.env.NEXT_PUBLIC_TELP || "default-phone-number";

    const pesan = useMemo(
        () => `Halo saya ingin memesan produk ${data?.name ?? "tanpa nama"} || dengan link: ${url}`,
        [data?.name, url]
    );

    const link = useMemo(
        () => `https://wa.me/${telp}?text=${encodeURIComponent(pesan)}`,
        [telp, pesan]
    );

    // Helper function untuk mengecek dan memformat nilai
    const displayValue = (value?: string | null) => {
        if (!value || value.trim() === "") return "Tidak tersedia";
        return value;
    };

    if (!data?.name) {
        return <div className="text-gray-500">Memuat informasi produk...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header Produk */}
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                        {data.name}
                    </h1>
                    {data.category?.name && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
              {data.category.name}
            </span>
                    )}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Detail Produk */}
            <div className="space-y-6">
                {/* Deskripsi */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <InfoIcon size={20} className="text-blue-600" />
                        Deskripsi Produk
                    </div>
                    <div className="text-gray-700 leading-relaxed pl-7">
                        {displayValue(data.description)}
                    </div>
                </div>

                {/* Bahan Aktif */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <FlaskConicalIcon size={20} className="text-purple-600" />
                        Bahan Aktif
                    </div>
                    <div className="text-gray-700 leading-relaxed pl-7">
                        {displayValue(data.activeIngredients)}
                    </div>
                </div>

                {/* Isi Bersih */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <PackageIcon size={20} className="text-orange-600" />
                        Isi Bersih
                    </div>
                    <div className="text-gray-700 font-medium pl-7">
                        {displayValue(data.netWeight)}
                    </div>
                </div>

                {/* Informasi Tambahan */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900">Informasi Tambahan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="font-medium text-gray-600">Produsen:</span>
                            <span className="ml-2 text-gray-800">
                {displayValue(data.manufacturer)}
              </span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-600">Masa Simpan:</span>
                            <span className="ml-2 text-gray-800">
                {displayValue(data.shelfLife)}
              </span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-600">Kemasan:</span>
                            <span className="ml-2 text-gray-800">
                {displayValue(data.packaging)}
              </span>
                        </div>
                    </div>
                </div>

                {/* Debug Info (dev only) */}
                {process.env.NODE_ENV === "development" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">Debug Info</h4>
                        <div className="text-sm text-red-700 space-y-1">
                            <div>Description: {displayValue(data.description)}</div>
                            <div>Active Ingredients: {displayValue(data.activeIngredients)}</div>
                            <div>Net Weight: {displayValue(data.netWeight)}</div>
                            <div>Manufacturer: {displayValue(data.manufacturer)}</div>
                            <div>Shelf Life: {displayValue(data.shelfLife)}</div>
                            <div>Packaging: {displayValue(data.packaging)}</div>
                        </div>
                    </div>
                )}
            </div>

            <hr className="border-gray-200" />

            {/* Tombol Kontak */}
            <div className="flex items-center gap-x-3 pt-4">
                <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                >
                    <Button
                        size="lg"
                        className="w-full sm:w-auto flex items-center justify-center gap-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                    >
                        <MessageCircleIcon size={20} />
                        Hubungi Kami via WhatsApp
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Info;
