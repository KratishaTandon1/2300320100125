import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ThemeRegistry from "@/components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Notifications",
  description: "Real-time updates regarding Placements, Events, and Results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Navigation />
          <main style={{ padding: '32px 16px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            {children}
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
