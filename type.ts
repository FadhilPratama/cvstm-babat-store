export interface Banner {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    banner: Banner;
}

export interface Product {
    id: string;
    name: string;
    category: Category;
    isFeatured: boolean;
    isArchived: boolean;
    images: Image[];

    // Product detail fields
    description?: string | null;
    activeIngredients?: string | null;
    netWeight?: string | null;
    manufacturer?: string | null;
    shelfLife?: string | null;
    packaging?: string | null;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

export interface Image {
    id: string;
    url: string;
}