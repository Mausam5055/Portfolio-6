import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#545388",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mausamkar.com"),
  title: "Mausam’s Lucid Dreams · Mausam Kar, Product Designer & Art Director",
  description:
    "Mausam Kar is a product designer and art director who designs and builds products, design systems and brands. Based in Assam, India. Open to new roles and freelance work.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Mausam’s Lucid Dreams",
    title: "Mausam’s Lucid Dreams · Mausam Kar",
    description:
      "Mausam Kar is a product designer and art director who designs and builds products, design systems and brands. Based in Assam, India. Open to new roles and freelance work.",
    url: "https://mausamkar.com/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
