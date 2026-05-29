'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../style/EbookCard.module.css'

export default function NavLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // هذا هو كارد التحميل الوهمي الذي طلبته
  const LoadingCard = (
    <div className={`rounded-xl overflow-hidden relative ${styles.loadingActive}`}>
      <div className="loading-overlay">
        <div className={`w-full aspect-[3/4] ${styles.shimmerBg} rounded-lg mb-md flex items-center justify-center relative overflow-hidden`}>
          <div className={`${styles.morphingBlob} w-32 h-32 bg-primary/20 blur-xl absolute`}></div>
          <div className="relative z-10 text-primary/40">
            <span className="material-symbols-outlined text-4xl">auto_awesome</span>
          </div>
        </div>
        <div className={`h-6 w-3/4 ${styles.shimmerBg} rounded-full mb-3`}></div>
        <div className={`h-4 w-full ${styles.shimmerBg} rounded-full mb-2`}></div>
        {/* <div className={`h-4 w-5/6 ${styles.shimmerBg} rounded-full mb-6`}></div> */}
        <div className="flex justify-between items-center">
          <div className={`h-8 w-20 ${styles.shimmerBg} rounded-full`}></div>
          <div className={`h-10 w-10 ${styles.shimmerBg} rounded-full`}></div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={() => {
        startTransition(() => {
          router.push(href)
        })
      }}
    >
      {isPending ? LoadingCard : children}
    </div>
  )
}