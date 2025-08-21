import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import ProductList from "@/components/ui/product-list";
import Gallery from "@/components/gallery";
import Info from "@/components/ui/info";

export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<{ productId: string }>;
}) {
    const { productId } = await params;

    const product = await getProduct(productId);

    if (!product) {
        return (
            <Container>
                <div className="px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Produk tidak ditemukan
                    </h1>
                </div>
            </Container>
        );
    }

    const suggestedProducts = await getProducts({
        categoryId: product.category?.id,
    });

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        <Gallery images={product.images || []} />
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <Info data={product} />
                        </div>
                    </div>

                    {suggestedProducts.length > 0 && (
                        <>
                            <hr className="my-10" />
                            <ProductList title="Produk Terkait" items={suggestedProducts} />
                        </>
                    )}
                </div>
            </Container>
        </div>
    );
}
