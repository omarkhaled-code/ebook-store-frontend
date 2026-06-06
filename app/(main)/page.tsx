

import FeaturedEbookSection from '@/components/ebook/FeaturedEbookSection';
import FeaturesSection from '@/components/ui/FeaturesSection';
import Link from 'next/link';

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function HomePage() {
  // Hardcoded mock data from your original HTML design layout

  // await delay(500);

  // 2. جلب البيانات من الـ Store



  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden min-h-screen">

      {/* Hero Section */}
      <header className="relative pt-32 pb-xl overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-fixed/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-secondary-fixed/30 to-transparent blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-gutter grid lg:grid-cols-2 gap-lg items-center">
          <div className="space-y-md">
            <div className="inline-flex items-center gap-xs px-sm py-1 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-secondary font-label-mono text-label-mono uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">auto_stories</span>
              The Future of Digital Learning
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface leading-[1.05]">
              Premium Knowledge, <span className="text-primary">Elegantly Packaged.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Discover a curated library of high-end PDF ebooks designed for modern professionals. From deep-dive technical guides to visual design masterpieces.
            </p>
            <div className="flex flex-wrap gap-sm pt-xs">
              <Link href="/ebooks" className="bg-primary text-on-primary px-lg py-md rounded-xl font-headline-sm text-headline-sm shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all flex items-center gap-xs">
                Explore More Ebooks
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/15 transition-all duration-500"></div>
            <img className="relative w-full h-[540px] object-cover rounded-[2rem] shadow-2xl border border-surface-variant scale-100 group-hover:scale-[1.02] transition-transform duration-500" alt="Tablet showcasing minimalist UI book" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqSYL3Vt7abIxc-ulTDlG59musIuDFsdrZPzE0209457C7_01T1Uf_iCfxI8KvPhYZ7xAKwWFJAIw4TRJdfawIJIoRx43BBWl6iuIf8a_PwCSMt-bJo7QR92EHLyeK-M4J1tTmNMnOYWKe1Z7xXtCDS9UstpT0GnCqmr31D82idgazbwQEs3sC192Z7qBXLCTv2MsyIodS3apY7c21j82gZtmInfqxKa-sszYR47rf-d5eZmia1zNCiFVngwhjU353ltytfncSRA" />
            <div className="absolute bottom-6 left-6 right-6 p-md rounded-2xl border border-white/30 shadow-xl bg-white/70 backdrop-blur-md">
              
            </div>
          </div>
        </div>
      </header>

      {/* Featured Section */}
      <FeaturedEbookSection />
      <FeaturesSection/>

    </div>
  );
}