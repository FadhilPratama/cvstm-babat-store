import { Product } from "@/type";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
    return (
        <section className="w-full space-y-6">
            {/* Title Section */}
            <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    {title}
                </h2>
                <div className="mt-1 h-1 w-20 bg-green-600 mx-auto sm:mx-0 rounded-full" />
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
                <NoResults />
            ) : (
                <div
                    className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
            sm:gap-6
            md:gap-8
          "
                >
                    {items.map((item) => (
                        <ProductCard key={item.id} data={item} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductList;
