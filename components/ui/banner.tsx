import { Banner as BannerType } from "@/type";
import Image from "next/image";

interface BannerProps {
    data: BannerType;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div className="rounded-xl relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden">
                {/* Background Image */}
                <Image
                    src={data?.imageUrl}
                    alt="Banner"
                    fill
                    className="object-contain"
                    priority
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex justify-center items-center text-center gap-y-8 py-12 px-4 z-10">
                    <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl md:max-w-2xl text-white drop-shadow-lg">
                        {data?.label}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;