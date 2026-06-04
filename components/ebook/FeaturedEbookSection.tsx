'use client';

import { useEffect } from 'react';

import EbookCard from '@/components/ebook/EbookCard';
import { useBookStore } from '@/store/useBookStore';

export default function FeaturedEbookSection({
  withBG = true,
  currentBookId = '',
}: {
  withBG?: boolean;
  currentBookId?: number | string;
}) {
  const {
    booksBuffer,
    windowIndex,
    itemsPerView,
    setItemsPerView,
    next,
    prev,
    fetchBooks,
  } = useBookStore();

  useEffect(() => {
    fetchBooks(1);
  }, [fetchBooks]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3); // Tablet
      } else {
        setItemsPerView(4); // Desktop
      }
    };

    handleResize();

    window.addEventListener(
      'resize',
      handleResize
    );

    return () =>
      window.removeEventListener(
        'resize',
        handleResize
      );
  }, [setItemsPerView]);

  const visibleBooks = booksBuffer.slice(
    windowIndex,
    windowIndex + itemsPerView
  );

  const showNavigation =
    booksBuffer.length > itemsPerView;

  return (
    <section
      className={`py-xl ${withBG
        ? 'bg-surface-container-low'
        : ''
        }`}
    >
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
          <div className="space-y-xs">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Curated Collections
            </h2>

            <p className="font-body-md text-body-md text-on-surface-variant">
              Hand-picked digital releases
              focusing on practical skills and
              deep industry insights.
            </p>
          </div>

          {showNavigation && (
            <div className="flex gap-sm">
              <button
                onClick={prev}
                disabled={windowIndex === 0}
                className="p-xs rounded-full border border-outline-variant hover:bg-surface-container-highest transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">
                  chevron_left
                </span>
              </button>

              <button
                onClick={next}
                disabled={
                  windowIndex >=
                  booksBuffer.length -
                  itemsPerView
                }
                className="p-xs rounded-full border border-outline-variant hover:bg-surface-container-highest transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">
                  chevron_right
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-md">
          {visibleBooks.map((book) => (

            book.id === currentBookId ? null : (
                <EbookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  imageUrl={book.imageUrl}
                  isNew={book.isNew}
                  slug={book.slug}
                  isBestSeller={
                    book.isBestSeller
                  }
                />
            )
          ))}
        </div>
      </div>
    </section>
  );
}