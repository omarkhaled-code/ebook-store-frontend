import { laravelFetch } from '@/lib/laravel'
import { Order } from '@/types/order'
import DownloadButton from '@/components/dashboard/DownloadButton'
import Link from 'next/link'
import Image from 'next/image'

async function getPurchases() {
    const res = await laravelFetch('/dashboard/purchases')
    if (!res.ok) return []
    const data = await res.json()
    return data.data || []
}

export default async function PurchasesPage() {
    const purchases: Order[] = await getPurchases()

    if (purchases.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-xl text-center">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-md">
                    <span className="material-symbols-outlined text-[40px] text-outline">
                        menu_book
                    </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-xs">
                    No purchases yet
                </h2>
                <p className="font-body-md text-on-surface-variant mb-md">
                    You haven't purchased any ebooks yet.
                </p>
                <Link
                    href="/ebooks"
                    className="bg-primary text-on-primary px-lg py-sm rounded-xl font-body-sm font-semibold flex items-center gap-xs"
                >
                    <span className="material-symbols-outlined text-[18px]">explore</span>
                    Browse Ebooks
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-lg">

            {/* Stats bar */}
            <div className="flex items-center justify-between">
                <p className="font-body-md text-on-surface-variant">
                    <span className="font-semibold text-on-surface">{purchases.length}</span> ebooks in your library
                </p>
            </div>

            {/* Purchases grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
                {purchases.map((order) => (
                    <div
                        key={order.order_id}
                        className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-md transition-all group"
                    >
                        {/* Cover */}
                        <div className="aspect-[3/3] bg-surface-container-high overflow-hidden relative">
                            {order.ebook.cover_image_path ? (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_LARAVEL_IMG_URL}/${order.ebook.cover_image_path}`}
                                    alt={order.ebook.title}
                                    width={300}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[56px] text-outline">
                                        menu_book
                                    </span>
                                </div>
                            )}

                            {/* Paid badge */}
                            <div className="absolute top-sm right-sm">
                                <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-sm py-1 rounded-full flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    Purchased
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-md space-y-sm">
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                                    {order.ebook.title}
                                </h3>
                                <p className="font-body-sm text-on-surface-variant text-[12px]">
                                    by {order.ebook.author}
                                </p>
                            </div>

                            {/* Price + date */}
                            <div className="flex items-center justify-between pt-xs border-t border-outline-variant/20">
                                <span className="font-body-sm text-on-surface font-semibold">
                                    ${order.amount}
                                </span>
                                <span className="font-body-sm text-on-surface-variant text-[12px]">
                                    {order.paid_at
                                        ? new Date(order.paid_at).toLocaleDateString()
                                        : '—'
                                    }
                                </span>
                            </div>

                            {/* Download button */}
                            <DownloadButton orderId={order.order_id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}