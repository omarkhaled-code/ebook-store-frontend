import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-lg space-y-xl pt-32 pb-16">
      
      {/* Header Section */}
      <div className="text-center space-y-md">
        <h1 className="font-display-lg text-display-md md:text-display-lg text-on-surface font-bold">
          Our Journey into Knowledge
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          We believe that a book is a window to other worlds, and the key to every mind seeking growth.
        </p>
      </div>

      {/* Vision Section */}
      <div className="bg-surface-container-low p-lg md:p-xl rounded-2xl border border-outline-variant/30">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-md">Our Vision</h2>
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          To become the premier destination for every reader seeking variety, quality, and accessibility. 
          We don't just sell digital files; we provide "intellectual journeys" that accompany you wherever you go.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="p-md border border-outline-variant/30 rounded-xl">
          <h3 className="font-title-lg text-primary mb-sm">Diverse Library</h3>
          <p className="font-body-sm text-on-surface-variant">A wide selection of books across various fields, from fiction to science and technology.</p>
        </div>
        <div className="p-md border border-outline-variant/30 rounded-xl">
          <h3 className="font-title-lg text-primary mb-sm">Easy Access</h3>
          <p className="font-body-sm text-on-surface-variant">Secure shopping experience and instant book downloads at the click of a button, from any device.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center pt-md">
        <Link
          href="/ebooks" 
          className="inline-flex items-center gap-xs bg-primary text-on-primary px-lg py-md rounded-xl font-body-md font-semibold hover:bg-primary/90 transition-all"
        >
          Discover your next book now
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      </div>

    </div>
  );
}