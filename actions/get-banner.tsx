import { Banner } from "@/type";

const URL = process.env.PUBLIC_API_URL;

const getBanner = async (bannerId: string): Promise<Banner | null> => {
    try {
        const fetchURL = `${URL}/banners/${bannerId}`;
        console.log('🔍 Fetching banner from:', fetchURL);

        const res = await fetch(fetchURL, {
            cache: 'no-store'
        });

        console.log('📊 Response status:', res.status);

        if (!res.ok) {
            console.warn(`⚠️ Failed to fetch banner: ${res.status}`);
            return null;
        }

        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            console.warn(`⚠️ Expected JSON but got ${contentType}`);
            return null;
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.warn('⚠️ Error in getBanner:', error);
        return null;
    }
};

export default getBanner;