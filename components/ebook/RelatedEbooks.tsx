import EbookCard from '@/components/ebook/EbookCard';

export default function RelatedBooksSection({category}: {category: string}) {
  // 1. مصفوفة البيانات الديناميكية للكتب ذات الصلة
  const relatedBooks = [
    {
      title: 'Spatial Flow',
      author: 'Elena Vance',
      price: '19.99',
      slug: 'spatial-flow',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
      isNew: true
    },
    {
      title: 'The Indigo Horizon',
      author: 'Marcus Thorne',
      price: '22.50',
      slug: 'the-indigo-horizon',
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60',
      isBestSeller: true
    },
    {
      title: 'Digital Tactility',
      author: 'Sarah Jenkins',
      price: '29.00',
      slug: 'digital-tactility',
      imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'Material Logic',
      author: 'David Kroll',
      price: '15.99',
      slug: 'material-logic',
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'The Quiet City',
      author: 'Rivers & Associates',
      price: '34.99',
      slug: 'the-quiet-city',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60'
    }
  ];

  return (
    
    <section className="mt-xl pt-xl border-t border-outline-variant">
      <div className="flex items-center justify-between mb-lg">
        <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
          Related Professional Works
        </h3>
        {/* أزرار التنقل والتحكم */}
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-all cursor-pointer">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-all cursor-pointer">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-md">
        {relatedBooks.map((book, index) => (
          <EbookCard
            key={book.slug || index}
            title={book.title}
            author={book.author}
            price={book.price}
            slug={book.slug}
            imageUrl={book.imageUrl}
            isNew={book.isNew}
            isBestSeller={book.isBestSeller}
          />
        ))}
      </div>
    </section>
  );
}