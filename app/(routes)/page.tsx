import Container from "@/components/ui/container";
import getBanner from "@/actions/get-banner";
import Banner from "@/components/ui/banner";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ui/product-list";

export const revalidate = 0

const HomePage = async () => {
    const products = await getProducts({isFeatured: true});
    const banner = await getBanner("bf499495-4918-41b6-8476-711b75b512c6");

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