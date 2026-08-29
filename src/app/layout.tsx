import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "IAETDS — Enterprise Technology Defense & Sustainability",
    template: "%s · IAETDS",
  },
  description:
    "Intelligent Architecture for Enterprise Technology Defense & Sustainability. Security from ₹8,500/mo — provisioned on your domain, APIs, and hosts.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%230F172A'/><path d='M16 6l8 3.5v5.5c0 4.5-3 7.5-8 9-5-1.5-8-4.5-8-9V9.5L16 6z' fill='none' stroke='%232DD4BF' stroke-width='1.6'/><path d='M12.5 15.5l2.2 2.2 4.5-4.5' fill='none' stroke='%232DD4BF' stroke-width='1.6'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
