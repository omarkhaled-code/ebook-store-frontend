import { laravelFetch } from '@/lib/laravel'
import Link from 'next/link'

async function getAdminStats() {
  const [ebooksRes, ordersRes] = await Promise.all([
    laravelFetch('/admin/ebooks'),
    laravelFetch('/admin/orders'),
  ])

  const ebooksData = ebooksRes.ok ? await ebooksRes.json() : { total: 0, data: [] }
  const ordersData = ordersRes.ok ? await ordersRes.json() : { total: 0, data: [] }

  return { ebooksData, ordersData }
}

export default async function AdminPage() {
  const { ebooksData, ordersData } = await getAdminStats()

  const totalEbooks = ebooksData?.total || 0
  const totalOrders = ordersData?.total || 0
  const paidOrders = ordersData.data?.filter((o: any) => o.status === 'paid') || []
  const totalRevenue = paidOrders.reduce((sum: number, o: any) => sum + parseFloat(o.amount), 0)
  const recentOrders = ordersData.data?.slice(0, 5) || []

  return (
    <div className="space-y-lg">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

        <div className="bg-surface rounded-2xl p-md border border-outline-variant/30 space-y-xs">
          <div className="flex items-center justify-between">
            <p className="font-body-sm text-on-surface-variant">Total Ebooks</p>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">menu_book</span>
            </div>
          </div>
          <p className="font-display-lg text-display-lg text-on-surface font-bold">
            {totalEbooks}
          </p>
          <Link href="/admin/ebooks" className="font-body-sm text-primary hover:underline flex items-center gap-xs">
            Manage ebooks
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        <div className="bg-surface rounded-2xl p-md border border-outline-variant/30 space-y-xs">
          <div className="flex items-center justify-between">
            <p className="font-body-sm text-on-surface-variant">Total Orders</p>
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">receipt_long</span>
            </div>
          </div>
          <p className="font-display-lg text-display-lg text-on-surface font-bold">
            {totalOrders}
          </p>
          <Link href="/admin/orders" className="font-body-sm text-primary hover:underline flex items-center gap-xs">
            View all orders
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        <div className="bg-surface rounded-2xl p-md border border-outline-variant/30 space-y-xs">
          <div className="flex items-center justify-between">
            <p className="font-body-sm text-on-surface-variant">Total Revenue</p>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-[20px]">payments</span>
            </div>
          </div>
          <p className="font-display-lg text-display-lg text-on-surface font-bold">
            ${totalRevenue.toFixed(2)}
          </p>
          <p className="font-body-sm text-on-surface-variant">
            from {paidOrders.length} paid orders
          </p>
        </div>

      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Link
            href="/admin/ebooks/new"
            className="flex items-center gap-md p-md bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-primary text-[24px]">upload_file</span>
            </div>
            <div>
              <p className="font-body-sm font-semibold text-on-surface">Upload New Ebook</p>
              <p className="font-body-sm text-on-surface-variant text-[12px]">Add a new PDF to the store</p>
            </div>
            <span className="material-symbols-outlined text-outline ml-auto">arrow_forward</span>
          </Link>

          <Link
            href="/admin/ebooks"
            className="flex items-center gap-md p-md bg-surface border border-outline-variant/30 rounded-2xl hover:bg-surface-container-low transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-[24px]">edit_note</span>
            </div>
            <div>
              <p className="font-body-sm font-semibold text-on-surface">Manage Ebooks</p>
              <p className="font-body-sm text-on-surface-variant text-[12px]">Edit, publish or delete ebooks</p>
            </div>
            <span className="material-symbols-outlined text-outline ml-auto">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-md">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Recent Orders
          </h2>
          <Link href="/admin/orders" className="font-body-sm text-primary hover:underline flex items-center gap-xs">
            View all
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-xl border border-outline-variant/30 rounded-2xl">
            <span className="material-symbols-outlined text-[48px] text-outline">receipt_long</span>
            <p className="font-body-md text-on-surface-variant mt-sm">No orders yet</p>
          </div>
        ) : (
          <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">User</th>
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold hidden md:table-cell">Ebook</th>
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">Amount</th>
                  <th className="text-left px-md py-sm font-body-sm text-on-surface-variant font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors">
                    <td className="px-md py-sm">
                      <p className="font-body-sm text-on-surface font-semibold truncate max-w-[120px]">
                        {order.user?.name || 'Unknown'}
                      </p>
                      <p className="font-body-sm text-on-surface-variant text-[11px] truncate max-w-[120px]">
                        {order.user?.email}
                      </p>
                    </td>
                    <td className="px-md py-sm hidden md:table-cell">
                      <p className="font-body-sm text-on-surface truncate max-w-[150px]">
                        {order.ebook?.title || 'Unknown'}
                      </p>
                    </td>
                    <td className="px-md py-sm">
                      <p className="font-body-sm text-on-surface font-semibold">
                        ${order.amount}
                      </p>
                    </td>
                    <td className="px-md py-sm">
                      <span className={`px-sm py-1 rounded-full text-[11px] font-semibold
                        ${order.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}