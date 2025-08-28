"use server"

import { Product } from "@/type";

export default async function getSearchProducts(query?: string): Promise<Product[]> {
    try {
        console.log("🔍 getSearchProducts called with query:", query);

        // Pastikan query bukan null/undefined dan minimal 3 karakter
        if (!query || query.trim().length < 3) {
            console.log("❌ Query too short or empty, minimum 3 characters required");
            return [];
        }

        // Fetch semua produk dari API (karena API tidak support server-side filtering)
        const baseUrl = process.env.PUBLIC_API_URL;
        const productsUrl = `${baseUrl}/products`;

        console.log("🌐 Fetching all products from:", productsUrl);

        const res = await fetch(productsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            cache: "no-store",
            signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        console.log("📡 Response status:", res.status, res.statusText);

        if (!res.ok) {
            const errorText = await res.text();
            console.error("❌ API failed:", {
                status: res.status,
                statusText: res.statusText,
                body: errorText
            });
            return [];
        }

        const allProducts = await res.json();
        console.log("✅ All products fetched:", allProducts.length, "products");

        // Validasi bahwa data adalah array
        if (!Array.isArray(allProducts)) {
            console.error("❌ API response is not an array:", typeof allProducts);
            return [];
        }

        // Client-side filtering berdasarkan query
        const searchQuery = query.trim().toLowerCase();
        const filteredProducts = allProducts.filter((product: Product) => {
            // Search berdasarkan nama produk dan kategori
            const nameMatch = product.name?.toLowerCase().includes(searchQuery);
            const categoryMatch = product.category?.name?.toLowerCase().includes(searchQuery);

            return nameMatch || categoryMatch;
        });

        console.log(`🔍 Filtered products: ${filteredProducts.length} results for "${query}"`);

        return filteredProducts as Product[];

    } catch (error) {
        console.error("💥 Error in getSearchProducts:", error);

        if (error instanceof Error) {
            console.error("Error details:", {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }

        return [];
    }
}