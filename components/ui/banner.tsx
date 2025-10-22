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
        <div className={`relative rounded-xl overflow-hidden mt-4 md:mt-6 lg:mt-8 ${className}`}>
            <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden">

                {/* Background Image - Full Cover */}
                {data.imageUrl && (
                    <Image
                        src={data.imageUrl}
                        alt={data.label || "Banner"}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    />
                )}

                {/* Overlay gradien untuk memberikan kontras jika ada konten di atas */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Decorative elements untuk visual yang lebih menarik */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

                {/* Content area jika diperlukan */}
                {data.label && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;