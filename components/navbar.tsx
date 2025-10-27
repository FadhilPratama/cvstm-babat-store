"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/container";
import MainNav from "@/components/ui/main-nav";
import SearchBar from "@/components/ui/search-bar";
import { Category } from "@/type"; // gunakan tipe Category yang sudah kamu punya

interface NavbarProps {
    categories: Category[];
    logoBanner: {
        imageUrl?: string;
        label?: string;
    };
}

export default function Navbar({ categories, logoBanner }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="border-b fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <Container>
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        {logoBanner?.imageUrl ? (
                            <div className="relative w-28 h-10 sm:w-32">
                                <Image
                                    src={logoBanner.imageUrl}
                                    alt={logoBanner.label || "Logo"}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ) : (
                            <p className="font-bold text-lg">Toko</p>
                        )}
                    </Link>

                    {/* Menu desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        <MainNav data={categories} />
                    </div>

                    {/* Search + Hamburger */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block">
                            <SearchBar />
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6 text-gray-800" />
                            ) : (
                                <Menu className="h-6 w-6 text-gray-800" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Menu mobile */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-2 space-y-2 border-t border-gray-200 pt-2 pb-3">
                        <MainNav data={categories} />
                        <div className="px-2">
                            <SearchBar />
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
