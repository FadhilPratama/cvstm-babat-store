import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import NavbarWrapper from "@/components/ui/navbar-wrapper";
import ModalProvider from "@/providers/modal-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Toko Online",
    description: "Toko Online",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ModalProvider />
        <NavbarWrapper /> {/* <-- ini server-side, otomatis fetch kategori + banner */}
        <main className="pt-16"> {/* padding agar konten tidak tertutup navbar */}
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}
