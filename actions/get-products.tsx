import { Product } from "@/type";
import qs from "query-string";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    try {
        const url = qs.stringifyUrl({
            url: URL,
            query: {
                categoryId: query.categoryId,
                isFeatured: query.isFeatured,
            },
        });

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            return [];
        }

        const text = await res.text();

        try {
            const data = JSON.parse(text);
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    } catch {
        return [];
    }
};

export default getProducts;