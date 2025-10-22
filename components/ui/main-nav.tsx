'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/util";
import { Category } from "@/type";

interface MainNavProps {
    data: Category[]
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
    const pathname = usePathname();

    // Daftar kategori yang akan digabung menjadi "Perlindungan Tanaman"
    const protectionCategories = ['herbisida', 'fungi', 'insektisida'];

    // Filter kategori yang tidak termasuk dalam perlindungan tanaman
    const otherCategories = data.filter(category =>
        !protectionCategories.some(protCat =>
            category.name.toLowerCase().includes(protCat)
        )
    );

    // Cek apakah kategori perlindungan tanaman ada
    const hasProtectionCategories = data.some(category =>
        protectionCategories.some(protCat =>
            category.name.toLowerCase().includes(protCat)
        )
    );

    // Cek apakah sedang di halaman salah satu kategori perlindungan tanaman
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
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            {routes.map((route) => (
                <Link
                    href={route.href}
                    key={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-black",
                        route.active ? "text-black" : "text-neutral-500"
                    )}
                >
                    {route.label}
                </Link>
            ))}

            {/* Kategori Perlindungan Tanaman yang digabung */}
            {hasProtectionCategories && (
                <div className="relative group">
                    <span
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-black cursor-pointer",
                            isProtectionActive ? "text-black" : "text-neutral-500"
                        )}
                    >
                        Perlindungan Tanaman
                    </span>

                    {/* Dropdown menu */}
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {data.filter(category =>
                            protectionCategories.some(protCat =>
                                category.name.toLowerCase().includes(protCat)
                            )
                        ).map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.id}`}
                                className={cn(
                                    "block px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-black",
                                    pathname === `/category/${category.id}` ? "text-black bg-gray-50" : "text-neutral-500"
                                )}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default MainNav;