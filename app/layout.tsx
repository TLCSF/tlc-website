import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "The Living Church | Entheogenic Church & Spiritual Community",
    template: "%s | The Living Church"
  },
  description:
    "The Living Church is a San Francisco-based entheogenic church and spiritual community focused on education, connection, and sacred mushroom traditions.",
  openGraph: {
    title: "The Living Church",
    description:
      "A community for learning, exploration, and intentional practice.",
    url: siteConfig.url,
    siteName: "The Living Church",
    images: [{ url: "/images/tlc/chapel-wide.jpg", width: 1080, height: 1350 }],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/cdo5pyx.css" />
      </head>
      <body>
        {children}
        <JsonLd data={siteConfig.organizationSchema} />
      </body>
    </html>
  );
}
