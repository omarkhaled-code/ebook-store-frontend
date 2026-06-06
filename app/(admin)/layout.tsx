import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { laravelFetch } from '@/lib/laravel'
import AdminSideNav from '@/components/admin/AdminSideNav'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminBottomNav from '@/components/admin/AdminBottomNav'
import ExpiredSession from '@/components/auth/ExpiredSession'

// Check if user is admin on server side
async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  if (!token) return null

  const res = await laravelFetch('/auth/me')

  if (!res.ok) return null

  const data = await res.json()
  return data.user
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  // Not logged in → redirect to login
  if (!user) return <ExpiredSession />


  // Not admin → redirect to dashboard
  if (user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      <AdminSideNav />
      <div className="flex-1 flex flex-col ml-0 md:ml-64 min-w-0 overflow-x-hidden">
        <AdminHeader user={user} />
        <main className="flex-1 p-lg pb-32 md:pb-lg">
          {children}
        </main>
      </div>
      <AdminBottomNav /> {/* 👈 add here */}
    </div>

            
  )
}