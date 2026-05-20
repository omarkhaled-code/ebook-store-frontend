import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar/page";
import Footer from "@/components/ui/footer/page";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "LuminaBooks",
  description: "Premium ebook platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} bg-background text-on-background antialiased overflow-x-hidden `}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}