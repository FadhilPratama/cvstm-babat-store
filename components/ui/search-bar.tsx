"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Image from "next/image";
import getSearchProducts from "@/actions/get-search-products";
import { Product } from "@/type";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isPending, startTransition] = useTransition();
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounce search
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchTerm.trim().length > 2) {
                startTransition(async () => {
                    try {
                        const results = await getSearchProducts(searchTerm.trim());
                        setProducts(results);
                        setIsOpen(true);
                    } catch (error) {
                        console.error('Search failed:', error);
                        setProducts([]);
                    }
                });
            } else {
                setProducts([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [searchTerm]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsMobileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
        setSearchTerm("");
        setIsOpen(false);
        setIsMobileOpen(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setIsOpen(false);
            setIsMobileOpen(false);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        setProducts([]);
        setIsOpen(false);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="relative flex items-center" ref={searchRef}>
            {/* Mobile Search Toggle */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors lg:hidden"
                aria-label="Toggle search"
            >
                <Search className="h-5 w-5" />
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block relative">
                <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-80 pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </form>

                {/* Desktop Dropdown Results */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
                        {isPending && (
                            <div className="p-4 text-center text-gray-500">
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                    Mencari produk...
                                </div>
                            </div>
                        )}

                        {!isPending && products.length === 0 && searchTerm.length > 2 && (
                            <div className="p-4 text-center text-gray-500">
                                Produk tidak ditemukan
                            </div>
                        )}

                        {!isPending && products.length > 0 && (
                            <>
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleProductClick(product.id)}
                                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    >
                                        <div className="relative w-12 h-12 mr-3 bg-gray-200 rounded">
                                            {product.images?.[0]?.url && (
                                                <Image
                                                    src={product.images[0].url}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                {product.name}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {product.category?.name}
                                            </p>
                                            <p className="text-sm font-semibold text-blue-600">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* View All Results Link */}
                                <div
                                    onClick={handleSearch}
                                    className="p-3 text-center border-t border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                >
                                    <span className="text-sm text-blue-600 font-medium">
                                        Lihat semua hasil untuk "{searchTerm}"
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Search Overlay */}
            {isMobileOpen && (
                <div className="lg:hidden fixed inset-0 bg-white z-50">
                    <div className="p-4 border-b">
                        <div className="flex items-center">
                            <form onSubmit={handleSearch} className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        autoFocus
                                    />
                                    {searchTerm && (
                                        <button
                                            type="button"
                                            onClick={handleClear}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </form>
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="ml-3 p-2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Results */}
                    <div className="flex-1 overflow-y-auto">
                        {isPending && (
                            <div className="p-4 text-center text-gray-500">
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                    Mencari produk...
                                </div>
                            </div>
                        )}

                        {!isPending && products.length === 0 && searchTerm.length > 2 && (
                            <div className="p-4 text-center text-gray-500">
                                Produk tidak ditemukan
                            </div>
                        )}

                        {!isPending && products.length > 0 && (
                            <>
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleProductClick(product.id)}
                                        className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                                    >
                                        <div className="relative w-16 h-16 mr-4 bg-gray-200 rounded">
                                            {product.images?.[0]?.url && (
                                                <Image
                                                    src={product.images[0].url}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 mb-1">
                                                {product.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 mb-1">
                                                {product.category?.name}
                                            </p>
                                            <p className="font-semibold text-blue-600">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div
                                    onClick={handleSearch}
                                    className="p-4 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                >
                                    <span className="text-blue-600 font-medium">
                                        Lihat semua hasil untuk "{searchTerm}"
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;