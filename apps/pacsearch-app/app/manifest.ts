import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Pac-Search",
        short_name: "Pac-Search",
        description: "Search packages for Arch Linux throughout multiple AUR Repositories",
        start_url: "/",
        display: "standalone",
        background_color: "#2C2C2C",
        theme_color: "#2C2C2C",
        lang: "en",
        icons: [
            {
                src: "https://pacsearch-assets.b68.dev/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "https://pacsearch-assets.b68.dev/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "https://pacsearch-assets.b68.dev/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
            {
                src: "https://pacsearch-assets.b68.dev/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                src: "https://pacsearch-assets.b68.dev/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },  
        ],
    };
}
