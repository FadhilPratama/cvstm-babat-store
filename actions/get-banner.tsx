import { Banner } from "@/type";

const URL = process.env.PUBLIC_API_URL;

const getBanner = async (bannerId: string): Promise<Banner | null> => {
    try {
        const res = await fetch(`${URL}/banners/${bannerId}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return null;
        }

        return await res.json();
    } catch {
        return null;
    }
};

export default getBanner;