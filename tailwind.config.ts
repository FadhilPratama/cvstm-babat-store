import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui"],
            },
            colors: {
                primary: {
                    DEFAULT: "#16a34a", // hijau utama (Tailwind green-600)
                    light: "#22c55e",   // hijau terang
                    dark: "#15803d",    // hijau tua
                },
                secondary: {
                    DEFAULT: "#f3f4f6", // abu lembut untuk background
                    dark: "#e5e7eb",
                },
            },
            boxShadow: {
                card: "0 4px 10px rgba(0,0,0,0.05)",
                hover: "0 6px 14px rgba(0,0,0,0.08)",
            },
            borderRadius: {
                xl: "1rem",
            },
        },
    },
    plugins: [],
}

export default config
