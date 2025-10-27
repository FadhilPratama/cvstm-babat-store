import Navbar from "@/components/navbar";
import getCategories from "@/actions/get-categories";
import getBanner from "@/actions/get-banner";

export const revalidate = 0;

export default async function NavbarWrapper() {
    const categories = await getCategories();
    const logoBanner = await getBanner("bf499495-4918-41b6-8476-711b75b512c6");

    return <Navbar categories={categories} logoBanner={logoBanner} />;
}
