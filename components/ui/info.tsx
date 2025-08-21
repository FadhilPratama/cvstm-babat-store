"use client";

import { useEffect, useState } from "react";
import { Product } from "@/type";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(`${window.location.origin}/product/${data.id}`);
        }
    }, [data.id]);

    const telp = process.env.NEXT_PUBLIC_TELP;
    const pesan = `Halo saya ingin memesan produk ${data.name} - ${data.price} dengan link: ${url}`;
    const link = `https://wa.me/${telp}?text=${encodeURIComponent(pesan)}`;

    return (
        <div>
            <div className="mt-3 flex flex-col items-start">
                <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
                <span className="text-2xl text-gray-900 mt-3">
          <Currency value={data?.price} />
        </span>
            </div>
            <hr className="my-4" />
            <div className="mt-10 flex items-center gap-x-3">
                <Link href={link} target="_blank">
                    <Button className="flex items-center gap-x-2">
                        Hubungi Kami
                        <MessageCircleIcon size={20} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Info;
