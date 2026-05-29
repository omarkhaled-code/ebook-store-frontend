import Image from "next/image"
import Link from "next/link"
import NavLink from "../ui/NavLink"

interface EbookCardProps {
  title: string
  author: string
  price: string | number
  slug: string
  imageUrl?: string | null
  isNew?: boolean
  isBestSeller?: boolean
}

export default function EbookCard({
  title,
  author,
  price,
  slug,
  imageUrl,
  isNew = false,
  isBestSeller = false,
}: EbookCardProps) {
  return (
    <NavLink
      href={`/ebooks/${slug}`}
      className="bg-surface-container-lowest p-sm rounded-2xl border border-outline-variant/30 hover:border-primary/50 hover:shadow-lg transition-all group"
    >
      <div className="aspect-[3/4] rounded-xl overflow-hidden mb-sm relative">
        {imageUrl ? (
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            alt={title}
            src={imageUrl}
          />
        ) : (
          <Image
            src="/images/book-cover.png"
            alt="Book Cover"
            width={300}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        )}
        {isNew && (
          <div className="absolute top-2 right-2 bg-primary text-on-primary px-xs py-1 rounded-full font-label-mono text-[10px] uppercase">
            New
          </div>
        )}
        {isBestSeller && (
          <div className="absolute top-2 right-2 bg-secondary text-on-secondary px-xs py-1 rounded-full font-label-mono text-[10px] uppercase">
            Best Seller
          </div>
        )}
      </div>
      <div className="px-xs space-y-1">
        <h4 className="font-headline-sm text-[18px] text-on-surface truncate">
          {title}
        </h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          by {author}
        </p>
        <div className="flex items-center justify-between pt-sm">
          <span className="font-headline-sm text-headline-sm text-on-surface">
            ${price}
          </span>
          <div className="bg-primary-container/10 text-primary p-1.5 rounded-lg hover:bg-primary hover:text-on-primary transition-all">
            <span className="material-symbols-outlined text-[20px]">
              shopping_cart
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  )
}