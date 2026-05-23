'use client'

import { useEffect, useState } from 'react'
import EbookCard from '@/components/ebook/EbookCard'
import Pagination from '@/components/ebook/Pagination'
import EbooksSkeleton from '@/components/ebook/EbooksSkeleton'
import EmptyEbooks from '@/components/ebook/EmptyEbooks'
import { Ebook } from '@/types/ebook'

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)
  const [paginating, setPaginating] = useState(false) // 👈 new state
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    // Smooth scroll to top of list
    // window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        // First load → show skeleton
        // Page change → show subtle overlay, keep old content
        if (ebooks.length === 0) {
          setLoading(true)
        } else {
          setPaginating(true) // 👈 subtle loading on page change
        }

        const res = await fetch(`/api/ebooks?page=${currentPage}`)
        const data = await res.json()
        setEbooks(data.data || [])
        setLastPage(data.last_page || 1)
      } catch (err) {
        console.error('Failed to fetch ebooks', err)
      } finally {
        setLoading(false)
        setPaginating(false)
      }
    }

    fetchEbooks()
  }, [currentPage])

  // Only show skeleton on very first load
  if (loading) return <EbooksSkeleton />
  if (ebooks.length === 0) return <EmptyEbooks />

  return (
    <div className="relative pt-32 pb-xl overflow-hidden">
      <section className="mb-lg container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-md">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-xs">
              Explore Our Library
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Curated professional guides and technical deep-dives to accelerate
              your career in tech and business.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pt-12">

        {/* Subtle loading overlay — keeps old content visible */}
        <div className={`relative transition-opacity duration-300 ${paginating ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Small spinner top right during pagination */}
          {paginating && (
            <div className="absolute top-0 right-0 z-10">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-md">
            {ebooks.map((book: Ebook) => (
              <EbookCard
                key={book.id}
                title={book.title}
                author={book.author}
                price={book.price}
                slug={book.slug}
                imageUrl={book.cover_image_path}
              />
            ))}
          </div>
        </div>

        <Pagination
          handlePageChange={handlePageChange}
          current_page={currentPage}
          last_page={lastPage}
        />
      </section>
    </div>
  )
}