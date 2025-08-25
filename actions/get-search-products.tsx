"use server";

import { Product } from "@/type";

export default async function getSearchProducts(query?: string): Promise<Product[]> {
    try {
        // pastikan query bukan null/undefined
        if (!query || query.trim().length < 3) {
            return [];
        }

        const res = await fetch(`${process.env.PUBLIC_API_URL}/products?q=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Search API failed", res.statusText);
            return [];
        }

        const data = await res.json();
        return (data as Product[]) ?? [];
    } catch (error) {
        console.error("Error in getSearchProducts:", error);
        return [];
    }
}
