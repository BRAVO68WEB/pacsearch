import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import NameContext from "@/components/NameContext";
import getRepoPackages from "@/libs/get_packages";

const kanit = Kanit({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Pac-Search",
    description: "Search packages for Arch Linux throughout multiple AUR Repositories",
    openGraph: {
        type: "website",
        url: "https://pacsearch.b68.dev",
        siteName: "Pac-Search",
        images: [
            {
                url: "https://pacsearch-assets.b68.dev/og-image.png",
                width: 1200,
                height: 630,
                alt: "pacsearch",
            },
        ],
    },
    icons: [
        {
            url: "https://pacsearch-assets.b68.dev/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
        },
        {
            url: "https://pacsearch-assets.b68.dev/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
        },
        {
            url: "https://pacsearch-assets.b68.dev/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
        },
        {
            url: "https://pacsearch-assets.b68.dev/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
        },
        {
            url: "https://pacsearch-assets.b68.dev/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
        },
    ],
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const packages = await getRepoPackages(null, null, {
        perPage: 50,
        pageNumber: 1,
    });
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="https://pacsearch-assets.b68.dev/favicon.ico" sizes="any" />
            </head>
            <body className={`${kanit.className} bg-rp-moon-base`}>
                <NameContext pkgData={packages}>{children}</NameContext>
            </body>
        </html>
    );
}
