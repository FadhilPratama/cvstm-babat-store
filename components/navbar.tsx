import Container from "@/components/ui/container";
import Link from "next/link";
import Image from "next/image";
import MainNav from "@/components/ui/main-nav";
import SearchBar from "@/components/ui/search-bar";
import getCategories from "@/actions/get-categories";
import getBanner from "@/actions/get-banner";

export const revalidate = 0

const Navbar = async () => {
    const categories = await getCategories();

    // Ambil banner dengan ID yang sama untuk logo
    const logoBanner = await getBanner("bf499495-4918-41b6-8476-711b75b512c6");

    return (
        <div className="border-b fixed top-0 left-0 right-0 z-50 bg-white">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-8 gap-x-2 items-center">
                        {logoBanner && logoBanner.imageUrl ? (
                            <div className="relative h-15 w-45">
                                <Image
                                    src={logoBanner.imageUrl}
                                    alt={logoBanner.label || "Logo"}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ) : (
                            // Fallback jika banner logo tidak ada
                            <p className="font-bold text-xl">Toko</p>
                        )}
                    </Link>
                    <MainNav data={categories} />

                    {/* Search Bar - positioned on the right */}
                    <div className="ml-auto flex items-center">
                        <SearchBar />
                    </div>
                </div>
            </Container>
        </div>
    );

}

export default Navbar;