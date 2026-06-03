import { laravelFetch } from '@/lib/laravel'
import Link from 'next/link'

async function getOrders(page = 1, status = '') {
  const query = new URLSearchParams({ page: String(page) })
  if (status) query.append('status', status)

  const res = await laravelFetch(`/admin/orders?${query}`)
  if (!res.ok) return { data: [], total: 0, last_page: 1 }
  return await res.json()
}

const statusConfig = {
  paid:    { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Paid' },
  pending: { bg: 'bg-amber-100',  text: 'text-amber-700',  label: 'Pending' },
  failed:  { bg: 'bg-red-100',    text: 'text-red-700',    label: 'Failed' },
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>
}) {
  const { page, status } = await searchParams
  const currentPage = parseInt(page || '1')
  const currentStatus = status || ''

  const ordersData = await getOrders(currentPage, currentStatus)

  const totalRevenue = ordersData.data
    .filter((o: any) => o.status === 'paid')
    .reduce((sum: number, o: any) => sum + parseFloat(o.amount), 0)

  return (
    <div className="space-y-lg">

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">

        <div className="bg-surface rounded-xl p-md border border-outline-variant/30">
          <p className="font-body-sm text-on-surface-variant">Total Orders</p>
          <p className="font-headline-md text-headline-md text-on-surface font-bold">
            {ordersData.total}
          </p>
        </div>

        <div className="bg-surface rounded-xl p-md border border-outline-variant/30">
          <p className="font-body-sm text-on-surface-variant">Paid</p>
          <p className="font-headline-md text-headline-md text-green-600 font-bold">
            {ordersData.data.filter((o: any) => o.status === 'paid').length}
          </p>
        </div>

        <div className="bg-surface rounded-xl p-md border border-outline-variant/30">
          <p className="font-body-sm text-on-surface-variant">Pending</p>
          <p className="font-headline-md text-headline-md text-amber-600 font-bold">
            {ordersData.data.filter((o: any) => o.status === 'pending').length}
          </p>
        </div>

        <div className="bg-surface rounded-xl p-md border border-outline-variant/30">
          <p className="font-body-sm text-on-surface-variant">Revenue</p>
          <p className="font-headline-md text-headline-md text-primary font-bold">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>

      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-sm flex-wrap">
        {[
          { label: 'All',     value: '' },
          { label: 'Paid',    value: 'paid' },
          { label: 'Pending', value: 'pending' },
          { label: 'Failed',  value: 'failed' },
        ].map((tab) => (
          <Link
            key={tab.value}
            href={`/admin/orders?status=${tab.value}`}
            className={`px-md py-xs rounded-full font-body-sm font-semibold transition-all
              ${currentStatus === tab.value
                ? 'bg-primary text-on-primary'
                : 'bg-surface border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
              }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      {ordersData.data.length === 0 ? (
        <div className="text-center py-xl border border-outline-variant/30 rounded-2xl bg-surface">
          <span className="material-symbols-outlined text-[48px] text-outline">receipt_long</span>
          <p className="font-body-md text-on-surface-variant mt-sm">No orders found</p>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">#</th>
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">User</th>
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold hidden md:table-cell">Ebook</th>
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">Amount</th>
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">Status</th>
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.data.map((order: any) => {
                  const config = statusConfig[order.status as keyof typeof statusConfig]
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors"
                    >
                      {/* Order ID */}
                      <td className="px-md py-sm">
                        <p className="font-body-sm text-on-surface-variant">
                          #{order.id}
                        </p>
                      </td>

                      {/* User */}
                      <td className="px-md py-sm">
                        <p className="font-body-sm text-on-surface font-semibold truncate max-w-[120px]">
                          {order.user?.name || 'Unknown'}
                        </p>
                        <p className="font-body-sm text-on-surface-variant text-[11px] truncate max-w-[120px]">
                          {order.user?.email}
                        </p>
                      </td>

                      {/* Ebook */}
                      <td className="px-md py-sm hidden md:table-cell">
                        <p className="font-body-sm text-on-surface truncate max-w-[160px]">
                          {order.ebook?.title || 'Unknown'}
                        </p>
                        <p className="font-body-sm text-on-surface-variant text-[11px]">
                          by {order.ebook?.author}
                        </p>
                      </td>

                      {/* Amount */}
                      <td className="px-md py-sm">
                        <p className="font-body-sm text-on-surface font-semibold">
                          ${order.amount}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-md py-sm">
                        <span className={`px-sm py-1 rounded-full text-[11px] font-semibold ${config?.bg} ${config?.text}`}>
                          {config?.label || order.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-md py-sm hidden lg:table-cell">
                        <p className="font-body-sm text-on-surface-variant text-[12px]">
                          {order.paid_at
                            ? new Date(order.paid_at).toLocaleDateString()
                            : new Date(order.created_at).toLocaleDateString()
                          }
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {ordersData.last_page > 1 && (
            <div className="flex items-center justify-center gap-sm p-md border-t border-outline-variant/30">
              {Array.from({ length: ordersData.last_page }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/admin/orders?page=${p}&status=${currentStatus}`}
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
      )}

    </div>
  )
}