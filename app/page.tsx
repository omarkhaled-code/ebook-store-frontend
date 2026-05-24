
import EbookCard from '@/components/ebook/EbookCard'; // Adjust this import path based on your folder structure

import Link from 'next/link';

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const featuredBooks = [
    {
      title: 'Architectural Ethics',
      author: 'Elena Rodriguez',
      price: 34,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgIcuSr0tLpYNTnXNvCBJrGs547RAzxrzwoQuXv232oXoJaoh451H5DBmPVYXYWR3LkIPUeJ73Sp9XaFWvVzZPgEORbx-DoNTsU6xRa0XyHRC3hSnIwHgO5okRY8w0TAws5L68MYQ97e8sZKhHvXnbmpklQ1bBiGoPV_rJoGNO4B67qjZyp7fopnoiUl2fLufjogA0sUn9VoyFXoWPbyfauA06BA9RggoV6h7XWyAF_2FGrnMMuHmkjvWyz-rEF-WXsPF6L29iUQ',
      isNew: true,
    },
    {
      title: 'The AI Frontier',
      author: 'Marcus Thorne',
      price: 42,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEZ1rfR7EoVk3kEXVnET3u3NEv1a_EFK63RtSepBUG_NGJFZnjIjnEdDkDlkPOFsPfHCHs343cQudQWmm0TjAft_ZRhFifyxSxkQhpxBx7uPWTrkbAA061KpfWg6xfO8nAL31n_ya65f5Rqc9qve7T6acRaqD5qlWGo2XnfkHCgBdHPJWXOHreFTpXGQ702CqF3-HIdlNBWsGGKgwBWVO_AdnRo70Swe_IeTDWf-thA6CUrE8_2LFaDvBsyEdlEbI6oFJARgf9Ww',
    },
    {
      title: 'Theory of Hue',
      author: 'Sarah Jenkins',
      price: 25,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOmYEjDVS_oM9PRBbz8EGsklMbrSo6x8UezZYlTwJIz5aXl0rfAmHjCUdiFgUtsoAKcCAr-efIrasK_lasFYBrX2rFqtTrFQ6F30qU2dDrqRB0xpVzLeaVGEKlFoEh7pMjN0DmCqRkIlEy7682JM-9vSzydZov85jHzMHICi-2D5E6nauiIjcdaPB-ZsiKNz0ZbsswfNVIRet2byPGAQbOa7O1hMQg0a4RO_-u5sWB5uqOelitmin-rG7mFdCqRdJmCUkEi7T2KQ',
      isBestSeller: true,
    },
    {
      title: 'Ascent to Lead',
      author: 'David Wu',
      price: 39,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1J1UwN-4-Oor9Kjsb8yFCs6xt-SUYr7WLE2TERLe7ux3dOe4_Cd1KGxdNGHNSEhFa5NQACPMLLnsb2Z2HYWyRRnEOXBiYIHhhDnmvFMuwHFsocldN3lZNth4Ygb_bXUJ0eP8xWgIsZXoUB5yG_PpGzG5GE9fJR-ldJQP9-wF9p6ccEOGwh1-L9t-7aB66CpPFn8ye-XEAb46AIfUi3_7D5iNJxzzMMDkf4lUZ9rGu9wCbSCtMaeL5QkPy9QTaiUZjtw7Dy8gszg',
    },
  ];


export default function HomePage() {
  // Hardcoded mock data from your original HTML design layout
  
  // await delay(500);
  
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
            <div className="flex items-center gap-md pt-md">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-surface" alt="User portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi9hB1ZodTXCTMeRLsnmVnjMA_gChwXycpLd_i0IHHq18sS2tCqGrtzJ8VRC6DDcPPQQLqM2_CfS8SjTFtRXAnDQ3gRYexRrdi-iFH7g639bkXnHG3Xsu50MwrFHoe_M_69Xk2nKunaw7KOhjufEAP1VK_uAcSpxzGFUCgDR0dwW9adaezeMZTMiZKvLVFd2j-x99I0KCYf1l0WviXduzkiqAkVNW7LRw_a-vR4dmXHHLgF0gzZCNInoPB5NTM5pDSqgjXcTAlfg" />
                <img className="w-10 h-10 rounded-full border-2 border-surface" alt="User portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfQiKvsUFokyslhn1Tb3wDMHeM4drf-3oSDS86wKEQlSLW0g82NhmxPTMKcF1NzrQWGGbmu_d5N2-wkwCFWY00Ag4o6DB-jV39HLzIzmcpi7jz9wwjZ5UBXi5bOTWnLqY1pwYde8-8nXzdhfxNm--6MGVse_xRzdAATWFH9nUpU9uZMpu_9joXk0yVEtpK6M1EZa0fPBW9t_xBPBLqoZynj6eK_mg43UmvU-uGRze_Mdtc2VD2aobHCS6SqzL3YOgrv3tmxzEurA" />
                <img className="w-10 h-10 rounded-full border-2 border-surface" alt="User portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUwv1ZN2nVFSW25N1WewHH4kDZApaEuBI9vGvPslaaqTfZy4q9Ku6DrWsVlXo5OZ0tTN-y1JLhl3OH4jYyOpUfDcG4_BkLmuwAFTJV0M8-AaiMBT4tmT2KrG2ZeQfnbKqGZHpKYpiiXzaldh4vcwuFFraLwlTVa9Rf5oq_-qqn6ax4_8ac23zEeHs8lMRsHNzkyV6zFvmSKq3rN_MRCmf-uiDk1Mc53wHStepWdQMVKttKToblu3IvKs_dYUUsQMjExh6upEbk8w" />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Joined by <span className="font-bold text-on-surface">15,000+</span> readers worldwide
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/15 transition-all duration-500"></div>
            <img className="relative w-full h-[540px] object-cover rounded-[2rem] shadow-2xl border border-surface-variant scale-100 group-hover:scale-[1.02] transition-transform duration-500" alt="Tablet showcasing minimalist UI book" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqSYL3Vt7abIxc-ulTDlG59musIuDFsdrZPzE0209457C7_01T1Uf_iCfxI8KvPhYZ7xAKwWFJAIw4TRJdfawIJIoRx43BBWl6iuIf8a_PwCSMt-bJo7QR92EHLyeK-M4J1tTmNMnOYWKe1Z7xXtCDS9UstpT0GnCqmr31D82idgazbwQEs3sC192Z7qBXLCTv2MsyIodS3apY7c21j82gZtmInfqxKa-sszYR47rf-d5eZmia1zNCiFVngwhjU353ltytfncSRA" />
            <div className="absolute bottom-6 left-6 right-6 p-md rounded-2xl border border-white/30 shadow-xl bg-white/70 backdrop-blur-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-label-mono text-label-mono text-primary uppercase">Trending Now</p>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Mastering Minimalist UI</h3>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">$29.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Section */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
            <div className="space-y-xs">
              <h2 className="font-headline-md text-headline-md text-on-surface">Curated Collections</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Hand-picked digital releases focusing on practical skills and deep industry insights.
              </p>
            </div>
            <div className="flex gap-sm">
              <button className="p-xs rounded-full border border-outline-variant hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-xs rounded-full border border-outline-variant hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Catalog Layout Mapping Your Component */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-md">
            {featuredBooks.map((book, index) => (
              <EbookCard
                key={index}
                title={book.title}
                author={book.author}
                price={book.price}
                imageUrl={book.imageUrl}
                isNew={book.isNew}
                isBestSeller={book.isBestSeller}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="py-xl">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface">Trusted by Industry Leaders</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Our readers work at the world's most innovative companies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {/* Review 1 */}
            <div className="bg-surface p-md rounded-2xl border border-outline-variant/30 shadow-sm space-y-md">
              <div className="flex gap-1 text-tertiary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
                "The quality of PDFs from LuminaBooks is unparalleled. The typography and layout design make reading on my tablet an absolute joy compared to standard formats."
              </p>
              <div className="flex items-center gap-sm pt-sm border-t border-outline-variant/20">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary">JD</div>
                <div>
                  <p className="font-body-sm text-body-sm font-bold text-on-surface">James D'Angelo</p>
                  <p className="font-label-mono text-[10px] text-on-surface-variant">Senior Designer at Stripe</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-surface p-md rounded-2xl border border-outline-variant/30 shadow-sm space-y-md lg:translate-y-4">
              <div className="flex gap-1 text-tertiary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
                "Finding high-level technical depth without fluff is hard. LuminaBooks curates exactly what a developer needs to level up their systems thinking."
              </p>
              <div className="flex items-center gap-sm pt-sm border-t border-outline-variant/20">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-secondary">AM</div>
                <div>
                  <p className="font-body-sm text-body-sm font-bold text-on-surface">Amina Moussa</p>
                  <p className="font-label-mono text-[10px] text-on-surface-variant">CTO at Vertex</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-surface p-md rounded-2xl border border-outline-variant/30 shadow-sm space-y-md">
              <div className="flex gap-1 text-tertiary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
                "A masterclass in curation. Every purchase I've made here has directly contributed to my personal growth and professional toolkit."
              </p>
              <div className="flex items-center gap-sm pt-sm border-t border-outline-variant/20">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-tertiary">RL</div>
                <div>
                  <p className="font-body-sm text-body-sm font-bold text-on-surface">Robert Lawson</p>
                  <p className="font-label-mono text-[10px] text-on-surface-variant">Lead Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}