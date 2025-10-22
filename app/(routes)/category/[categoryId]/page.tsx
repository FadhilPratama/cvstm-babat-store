import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";
import Container from "@/components/ui/container";
import Banner from "@/components/ui/banner";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

interface CategoryPageProps {
    params: Promise<{ categoryId: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { categoryId } = await params;

    const products = await getProducts({
        categoryId,
    });

    const category = await getCategory(categoryId);

    return (
        <div className="bg-white">
            <Container>
                <Banner data={category.banner} />
                <div className="px-4 sm:px-6 lg:px-8 pb-24 mt-6">
                    <div className="lg:col-span-4">
                        {products.length === 0 && <NoResults />}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {products.map((item) => (
                                <ProductCard key={item.id} data={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategoryPage;