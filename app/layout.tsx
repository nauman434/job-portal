import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.minersjobs.com/"),
  title: {
    default: 'Find Career opportunities in Mining, Oil, and Gas | Miners Jobs',
    template: '%s | Miners Jobs',
  },
  description: 'Discover exciting job opportunities in the mining,gas and oil industries worldwide by browsing our 1140 job listings. Search for job and start your career today!',
  verification: {
    google: 'google',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute w-full z-50 top-0 items-center"> 
          <Navbar />
        </div>
        {children}
        <Analytics/>
        <Footer />
      </body>
    </html>
  );
}
