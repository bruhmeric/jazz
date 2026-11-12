import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // production domain for absolute OG/twitter image URLs —
  // change this if you deploy under a different domain (e.g. *.pages.dev)
  metadataBase: new URL("https://jazzel.lk"),
  title: "JAZZEL: Home & Office Furniture in Matale, Sri Lanka",
  description:
    "Sofas, beds, wardrobes and kids' furniture built to your sizes in melamine, MDF and steel — delivered islandwide from Samandawa Road, Matale.",
  keywords: [
    "Jazzel furniture",
    "furniture Sri Lanka",
    "sofa Matale",
    "wardrobe",
    "home office furniture",
    "kids furniture",
  ],
  authors: [{ name: "JAZZEL Furnitures" }],
  openGraph: {
    title: "JAZZEL: Home & Office Furniture in Matale",
    description:
      "Sized-to-order furniture from Matale with islandwide delivery — sofas, beds, wardrobes, kids' and office pieces.",
    type: "website",
    images: ["/brand/hero-edit.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
