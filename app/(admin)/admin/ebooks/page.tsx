import { laravelFetch } from '@/lib/laravel'
import Link from 'next/link'
import AdminEbookActions from '@/components/admin/AdminEbookActions'
import Image from 'next/image'

async function getEbooks(page = 1) {
  const res = await laravelFetch(`/admin/ebooks?page=${page}`)
  if (!res.ok) return { data: [], total: 0, last_page: 1 }
  return await res.json()
}

export default async function AdminEbooksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = parseInt(page || '1')
  const ebooksData = await getEbooks(currentPage)

  return (
    <div className="space-y-lg">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-body-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">{ebooksData.total}</span> total ebooks
          </p>
        </div>
        <Link
          href="/admin/ebooks/new"
          className="bg-primary text-on-primary px-md py-sm rounded-xl font-body-sm font-semibold flex items-center gap-xs shadow-md hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          Upload New
        </Link>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">Ebook</th>
                <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold hidden md:table-cell">Author</th>
                <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">Price</th>
                <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">Status</th>
                <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ebooksData.data.map((ebook: any) => (
                <tr
                  key={ebook.id}
                  className="border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors"
                >
                  {/* Ebook info */}
                  <td className="px-md py-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-10 h-12 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {ebook.cover_image_path ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_LARAVEL_IMG_URL}/${ebook.cover_image_path}`}
                            width={300}
                            height={400}
                            alt={ebook.title}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="material-symbols-outlined text-outline text-[18px]">book_2</span>
                        )}
                      </div>
                      <p className="font-body-sm text-on-surface font-semibold truncate max-w-[150px]">
                        {ebook.title}
                      </p>
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-md py-sm hidden md:table-cell">
                    <p className="font-body-sm text-on-surface-variant truncate max-w-[120px]">
                      {ebook.author}
                    </p>
                  </td>

                  {/* Price */}
                  <td className="px-md py-sm">
                    <p className="font-body-sm text-on-surface font-semibold">
                      ${ebook.price}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-md py-sm">
                    <span className={`px-sm py-1 rounded-full text-[11px] font-semibold
                      ${ebook.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                      {ebook.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-md py-sm">
                    <AdminEbookActions
                      ebookId={ebook.id}
                      isPublished={!!ebook.is_published}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {ebooksData.last_page > 1 && (
          <div className="flex items-center justify-center gap-sm p-md border-t border-outline-variant/30">
            {Array.from({ length: ebooksData.last_page }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/admin/ebooks?page=${p}`}
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-body-sm transition-all
                  ${p === currentPage
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                  }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}