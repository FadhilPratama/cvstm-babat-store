import Container from "@/components/ui/container";
import getBanner from "@/actions/get-banner";
import Banner from "@/components/ui/banner";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ui/product-list";

export const revalidate = 0

const HomePage = async () => {
    const products = await getProducts({isFeatured: true});
    const banner = await getBanner("db6afa85-4dfd-4c5c-8384-1e7ced3c5d54");

    return (
        <Container>
        <div className="space-y-10 pb-10">
            <Banner data={banner} />
            <div>
                <ProductList title="Produk Unggulan" items={products} />
            </div>
        </div>
        </Container>
    );
}

export default HomePage;