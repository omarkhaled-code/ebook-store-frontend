import { laravelFetch } from '@/lib/laravel'
import { Order } from '@/types/order'
import Link from 'next/link'

async function getPurchases() {
    const res = await laravelFetch('/dashboard/purchases')
    if (!res.ok) return []
    const data = await res.json()
    return data.data || []
}

export default async function DashboardPage() {
    const purchases: Order[] = await getPurchases()

    const totalSpent = purchases.reduce((sum, order) => {
        return sum + parseFloat(order.amount)
    }, 0)

    return (
        <div className="space-y-xl">

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

                <div className="bg-surface rounded-xl p-md border border-outline-variant/30 space-y-xs">
                    <div className="flex items-center justify-between">
                        <p className="font-body-sm text-on-surface-variant">Total Ebooks</p>
                        <span className="material-symbols-outlined text-primary">book_2</span>
                    </div>
                    <p className="font-display-lg text-display-lg text-on-surface font-bold">
                        {purchases.length}
                    </p>
                    <p className="font-body-sm text-on-surface-variant">
                        books in your library
                    </p>
                </div>

                <div className="bg-surface rounded-xl p-md border border-outline-variant/30 space-y-xs">
                    <div className="flex items-center justify-between">
                        <p className="font-body-sm text-on-surface-variant">Total Spent</p>
                        <span className="material-symbols-outlined text-secondary">payments</span>
                    </div>
                    <p className="font-display-lg text-display-lg text-on-surface font-bold">
                        ${totalSpent.toFixed(2)}
                    </p>
                    <p className="font-body-sm text-on-surface-variant">
                        EGP invested in knowledge
                    </p>
                </div>

                <div className="bg-surface rounded-xl p-md border border-outline-variant/30 space-y-xs">
                    <div className="flex items-center justify-between">
                        <p className="font-body-sm text-on-surface-variant">Latest Purchase</p>
                        <span className="material-symbols-outlined text-tertiary">schedule</span>
                    </div>
                    <p className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                        {purchases[0]?.ebook?.title || 'No purchases yet'}
                    </p>
                    <p className="font-body-sm text-on-surface-variant">
                        {purchases[0]?.paid_at
                            ? new Date(purchases[0].paid_at).toLocaleDateString()
                            : '—'
                        }
                    </p>
                </div>

            </div>

            {/* Recent purchases */}
            <div>
                <div className="flex items-center justify-between mb-md">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Recent Purchases
                    </h2>
                    <Link
                        href="/dashboard/purchases"
                        className="font-body-sm text-primary hover:underline flex items-center gap-xs"
                    >
                        View all
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                </div>

                {purchases.length === 0 ? (
                    <div className="text-center py-xl border border-outline-variant/30 rounded-xl">
                        <span className="material-symbols-outlined text-[48px] text-outline">
                            menu_book
                        </span>
                        <p className="font-body-md text-on-surface-variant mt-sm">
                            No purchases yet
                        </p>
                        <Link
                            href="/ebooks"
                            className="inline-flex items-center gap-xs mt-md text-primary font-body-sm hover:underline"
                        >
                            Browse ebooks
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-sm">
                        {purchases.slice(0, 3).map((order) => (
                            <div
                                key={order.order_id}
                                className="flex items-center gap-md p-md bg-surface rounded-xl border border-outline-variant/30"
                            >
                                {/* Cover */}
                                <div className="w-12 h-16 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {order.ebook.cover_image_path ? (
                                        <img
                                            src={order.ebook.cover_image_path}
                                            alt={order.ebook.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="material-symbols-outlined text-outline">book_2</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-body-sm text-on-surface font-semibold truncate">
                                        {order.ebook.title}
                                    </p>
                                    <p className="font-body-sm text-on-surface-variant text-[12px]">
                                        by {order.ebook.author}
                                    </p>
                                </div>

                                {/* Price + date */}
                                <div className="text-right flex-shrink-0">
                                    <p className="font-body-sm text-on-surface font-semibold">
                                        ${order.amount}
                                    </p>
                                    <p className="font-body-sm text-on-surface-variant text-[12px]">
                                        {order.paid_at
                                            ? new Date(order.paid_at).toLocaleDateString()
                                            : '—'
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}