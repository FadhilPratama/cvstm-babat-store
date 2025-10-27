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

        const baseUrl = process.env.PUBLIC_API_URL;

        // Validasi environment variable
        if (!baseUrl) {
            console.error("❌ PUBLIC_API_URL is not defined in environment variables");
            return [];
        }

        // Encode query untuk URL safety
        const encodedQuery = encodeURIComponent(query.trim());

        // Gunakan parameter 'global=true' untuk fetch tanpa storeId
        // Dan parameter 'q' untuk search query
        const productsUrl = `${baseUrl}/products?global=true&q=${encodedQuery}`;

        console.log("🌐 Fetching products from:", productsUrl);

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

        const text = await res.text();
        console.log("📄 Response text length:", text.length);

        // Parse JSON dengan error handling
        let products: Product[];
        try {
            const data = JSON.parse(text);
            products = Array.isArray(data) ? data : [];
        } catch (jsonError) {
            console.error("❌ JSON parse error:", jsonError);
            console.error("Response text:", text.substring(0, 200)); // Log first 200 chars
            return [];
        }

        console.log(`✅ Search results: ${products.length} products for "${query}"`);

        return products;

    } catch (error) {
        console.error("💥 Error in getSearchProducts:", error);

        if (error instanceof Error) {
            console.error("Error details:", {
                name: error.name,
                message: error.message,
                stack: error.stack
            });

            // Handle timeout error specifically
            if (error.name === 'AbortError' || error.name === 'TimeoutError') {
                console.error("⏱️ Request timeout - API took too long to respond");
            }
        }

        return [];
    }
}