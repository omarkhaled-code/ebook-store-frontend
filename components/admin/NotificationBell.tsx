'use client'

import { useState, useEffect, useRef } from 'react'

interface Notification {
  id: string
  data: {
    message: string
    user_name: string
    user_email: string
    ebook_title: string
    amount: string
    order_id: number
  }
  read: boolean
  created_at: string
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/admin/notifications')
      const data = await res.json()
      setNotifications(data.notifications || [])
      setUnreadCount(data.unread_count || 0)
    } catch (err) {
      console.error('Failed to fetch notifications', err)
    }
  }

  // Fetch on mount + every 30 seconds
  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMarkRead = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications/${id}/read`, { method: 'PATCH' })
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error('Failed to mark as read', err)
    }
  }

  const handleMarkAllRead = async () => {
    setLoading(true)
    try {
      await fetch('/api/admin/notifications/read-all', { method: 'PATCH' })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error('Failed to mark all as read', err)
    } finally {
      setLoading(false)
    }
  }

  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-on-surface-variant text-[22px]"
          style={{ fontVariationSettings: unreadCount > 0 ? "'FILL' 1" : "'FILL' 0" }}>
          notifications
        </span>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
   {open && (
  <>
    {/* خلفية معتمة خفيفة للموبايل فقط تقفل القائمة عند الضغط عليها لـ UX أفضل */}
    <div 
      className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/40 z-40 backdrop-blur-sm"
      onClick={() => setOpen(false)} // فرضاً أن لديك دالة لتغيير حالة الفتح
    />

    <div className="
      /* إعدادات الموبايل (شاشة كاملة تقريباً ومثبتة في المنتصف أو أسفل الـ Navbar) */
      fixed top-16 left-4 right-4 max-h-[calc(100vh-5rem)] w-auto
      
      /* إعدادات اللابتوب والـ Desktop (يرجع الـ Card لمكانه الطبيعي وعرضه الثابت) */
      md:absolute md:top-12 md:right-0 md:left-auto md:w-80 md:max-h-[500px]
      
      /* التصميم المشترك الموحد */
      bg-surface dark:bg-surface-dim border border-outline-variant/30 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col transition-all"
    >

      {/* Header */}
      <div className="flex items-center justify-between px-md py-sm border-b border-outline-variant/30 bg-surface dark:bg-surface-dim sticky top-0 z-10">
        <h3 className="font-body-sm font-semibold text-on-surface flex items-center">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-xs px-xs py-0.5 bg-primary/10 text-primary text-[11px] rounded-full">
              {unreadCount} new
            </span>
          )}
        </h3>
        <div className="flex items-center gap-sm">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={loading}
              className="font-body-sm text-[12px] text-primary hover:underline cursor-pointer disabled:opacity-50"
            >
              Mark all read
            </button>
          )}
          {/* زر إغلاق إضافي يظهر في الموبايل فقط ليسهل على المستخدم قفل الإشعارات */}
          <button 
            onClick={() => setOpen(false)} 
            className="md:hidden text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="overflow-y-auto flex-1 max-h-[360px] md:max-h-[400px]">
        {notifications.length === 0 ? (
          <div className="text-center py-xl">
            <span className="material-symbols-outlined text-[36px] text-outline">
              notifications_off
            </span>
            <p className="font-body-sm text-on-surface-variant mt-xs">
              No notifications yet
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => {
                if (!notification.read) handleMarkRead(notification.id);
                // اختياري: يمكنك غلق القائمة في الموبايل عند الضغط على الإشعار
                if (window.innerWidth < 768) setOpen(false); 
              }}
              className={`px-md py-sm border-b border-outline-variant/20 cursor-pointer hover:bg-surface-container-low transition-colors
                ${!notification.read ? 'bg-primary/5' : ''}`}
            >
              <div className="flex items-start gap-sm">

                {/* Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                  ${!notification.read ? 'bg-primary/10' : 'bg-surface-container-high'}`}>
                  <span className="material-symbols-outlined text-[16px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}>
                    shopping_bag
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-body-sm text-on-surface text-[13px] leading-tight break-words">
                    <span className="font-semibold">{notification.data.user_name}</span>
                    {' '}purchased{' '}
                    <span className="font-semibold truncate block md:inline-block md:max-w-none max-w-[180px] vertical-bottom">{notification.data.ebook_title}</span>
                  </p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="font-body-sm text-primary text-[12px] font-semibold">
                      ${notification.data.amount}
                    </p>
                    <p className="font-body-sm text-on-surface-variant text-[11px]">
                      {timeAgo(notification.created_at)}
                    </p>
                  </div>
                </div>

                {/* Unread dot */}
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  </>
)}
    </div>
  )
}