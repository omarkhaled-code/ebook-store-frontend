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
        <div className="absolute right-0 top-12 w-80 bg-surface border border-outline-variant/30 rounded-2xl shadow-xl z-50 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-md py-sm border-b border-outline-variant/30">
            <h3 className="font-body-sm font-semibold text-on-surface">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-xs px-xs py-0.5 bg-primary/10 text-primary text-[11px] rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={loading}
                className="font-body-sm text-[12px] text-primary hover:underline cursor-pointer disabled:opacity-50"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications list */}
          <div className="max-h-[360px] overflow-y-auto">
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
                  onClick={() => !notification.read && handleMarkRead(notification.id)}
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
                      <p className="font-body-sm text-on-surface text-[13px] leading-tight">
                        <span className="font-semibold">{notification.data.user_name}</span>
                        {' '}purchased{' '}
                        <span className="font-semibold truncate">{notification.data.ebook_title}</span>
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
      )}
    </div>
  )
}