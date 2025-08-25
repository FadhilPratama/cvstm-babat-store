import { Banner as BannerType } from "@/type";
import Image from "next/image";

interface BannerProps {
    data: BannerType;
    className?: string;
}

const Banner: React.FC<BannerProps> = ({ data, className = "" }) => {
    // Fallback jika data tidak ada
    if (!data) {
        return null;
    }

    return (
        <div className={`p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden ${className}`}>
            <div className="rounded-xl relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden bg-gradient-to-br from-gray-50 via-green-50 to-gray-100">

                {/* Background Image */}
                {data.imageUrl && (
                    <Image
                        src={data.imageUrl}
                        alt={data.label || "Banner"}
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    />
                )}

                {/* Decorative elements untuk visual yang lebih menarik */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>
        </div>
    );
};

export default Banner;