'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/util";
import { Category } from "@/type";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MainNavProps {
    data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const protectionCategories = ['herbisida', 'fungi', 'insektisida'];

    const otherCategories = data.filter(category =>
        !protectionCategories.some(protCat =>
            category.name.toLowerCase().includes(protCat)
        )
    );

    const hasProtectionCategories = data.some(category =>
        protectionCategories.some(protCat =>
            category.name.toLowerCase().includes(protCat)
        )
    );

    const isProtectionActive = data.some(category =>
        protectionCategories.some(protCat =>
            category.name.toLowerCase().includes(protCat)
        ) && pathname === `/category/${category.id}`
    );

    const routes = otherCategories.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`,
    }));

    return (
        <nav className="flex flex-wrap items-center gap-3 md:gap-6">
            {/* Kategori lain */}
            {routes.map((route) => (
                <Link
                    href={route.href}
                    key={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-black whitespace-nowrap",
                        route.active ? "text-black" : "text-neutral-500"
                    )}
                >
                    {route.label}
                </Link>
            ))}

            {/* Dropdown Perlindungan Tanaman */}
            {hasProtectionCategories && (
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={cn(
                            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-black",
                            isProtectionActive ? "text-black" : "text-neutral-500"
                        )}
                    >
                        Perlindungan Tanaman
                        {dropdownOpen ? (
                            <ChevronUp size={14} />
                        ) : (
                            <ChevronDown size={14} />
                        )}
                    </button>

                    {dropdownOpen && (
                        <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in">
                            {data
                                .filter(category =>
                                    protectionCategories.some(protCat =>
                                        category.name.toLowerCase().includes(protCat)
                                    )
                                )
                                .map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/category/${category.id}`}
                                        className={cn(
                                            "block px-4 py-2 text-sm transition-colors hover:bg-gray-100",
                                            pathname === `/category/${category.id}`
                                                ? "text-black bg-gray-100"
                                                : "text-neutral-600"
                                        )}
                                        onClick={() => setDropdownOpen(false)} // Tutup setelah diklik
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default MainNav;
