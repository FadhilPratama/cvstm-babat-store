import Container from "@/components/ui/container";
import getBanner from "@/actions/get-banner";
import Banner from "@/components/ui/banner";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ui/product-list";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const banner = await getBanner("db6afa85-4dfd-4c5c-8384-1e7ced3c5d54");

    return (
        <div className="flex flex-col space-y-16 pb-16 bg-gray-50">
            {/* ✅ Hero Banner */}
            {banner && (
                <section className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
                    <Banner data={banner} />

                    {/* Overlay dan teks di atas banner */}
                    <div className="absolute inset-0  flex flex-col justify-center items-center text-center text-white px-6">
                        <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-lg mb-4 text-gray-50">
                            Selamat Datang di IndoAgri
                        </h1>
                        <p className="max-w-2xl text-base sm:text-lg text-gray-100 drop-shadow">
                            Penyedia benih, pupuk, dan perlindungan tanaman unggulan untuk hasil pertanian terbaik.
                        </p>
                    </div>
                </section>
            )}

            {/* ✅ Daftar Produk */}
            <Container>
                <section className="space-y-8">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900">
                        Produk Unggulan
                    </h2>

                    <ProductList title="" items={products} />
                </section>
            </Container>
        </div>
    );
};

export default HomePage;
