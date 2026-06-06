import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";


export const metadata: Metadata = {
  title: "LuminaBooks",
  description: "Premium ebook platform",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}