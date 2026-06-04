'use client'

import { useEffect, useState } from 'react'
import { useToastStore } from '@/store/toastStore'

const toastConfig = {
  success: {
    icon: 'check_circle',
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon_color: 'text-green-500',
    progress: 'bg-green-500',
  },
  error: {
    icon: 'cancel',
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon_color: 'text-red-500',
    progress: 'bg-red-500',
  },
  warning: {
    icon: 'warning',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-800',
    icon_color: 'text-amber-500',
    progress: 'bg-amber-500',
  },
  info: {
    icon: 'info',
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon_color: 'text-blue-500',
    progress: 'bg-blue-500',
  },
}

function ToastItem({ id, message, type, duration = 4000 }: {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}) {
  const { removeToast } = useToastStore()
  const [visible, setVisible] = useState(false)
  const config = toastConfig[type]

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setVisible(true), 10)

    // Animate out before removing
    const hideTimer = setTimeout(() => setVisible(false), duration - 300)
    

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [duration])

  return (
    <div
      className={`relative flex items-start gap-sm p-md rounded-xl border shadow-lg
        transition-all duration-300 ease-in-out w-[90vw] max-w-[400px] max-w-[400px]
        ${config.bg}
        ${visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-2 scale-95'
        }
      `}
    >
      {/* Icon */}
      <span
        className={`material-symbols-outlined text-[22px] mt-0.5 flex-shrink-0 ${config.icon_color}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {config.icon}
      </span>

      {/* Message */}
      <p className={`font-body-sm text-body-sm flex-1 ${config.text}`}>
        {message}
      </p>

      {/* Close button */}
      <button
        onClick={() => removeToast(id)}
        className={`flex-shrink-0 hover:opacity-70 transition-opacity ${config.text} cursor-pointer`}
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl overflow-hidden">
        <div
          className={`h-full ${config.progress} transition-all ease-linear`}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  )
}

export default function ToastContainer() {
  const { toasts } = useToastStore()

  return (
    <>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>


      <div className="fixed top-20 left-1/2 -translate-x-1/2 md:top-auto md:left-auto md:translate-x-0 md:bottom-6 md:right-6 flex flex-col gap-sm">
        
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </div>
    </>
  )
}