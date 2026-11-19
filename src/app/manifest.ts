import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tashkent Law School",
    short_name: "Tashkent Law",
    description: "Huquq, ingliz tili va boshqa fanlar bo‘yicha kurslar. TDYU, HMQA, JIDU ga tayyorlov.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0809",
    theme_color: "#0b0809",
    lang: "uz",
    icons: [
      { src: "/images/logo-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/logo-512.png", sizes: "512x512", type: "image/png" },
      { src: "/images/logo-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
