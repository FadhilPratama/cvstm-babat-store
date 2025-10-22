import { Product } from "@/type";
import qs from "query-string";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    try {
        // Debug log
        console.log("PUBLIC_API_URL:", process.env.PUBLIC_API_URL);
        console.log("Full URL:", URL);

        // Build query string
        const url = qs.stringifyUrl({
            url: URL,
            query: {
                categoryId: query.categoryId,
                isFeatured: query.isFeatured,
            },
        });

        console.log("Final fetch URL:", url);

        // Fetch data
        const res = await fetch(url, { cache: "no-store" });

        console.log("Response status:", res.status);
        console.log("Response headers:", Object.fromEntries(res.headers.entries()));

        // Coba parse JSON secara aman
        const text = await res.text();
        console.log("Response text:", text);

        if (!res.ok) {
            console.error(`[GET_PRODUCTS_ERROR] HTTP ${res.status}: ${text}`);
            return [];
        }

        try {
            const data = JSON.parse(text);
            return Array.isArray(data) ? data : [];
        } catch (jsonErr) {
            console.error("[GET_PRODUCTS_ERROR] JSON parse gagal:", jsonErr);
            return [];
        }
    } catch (error) {
        console.error("[GET_PRODUCTS_ERROR]", error);
        return [];
    }
};

export default getProducts;
