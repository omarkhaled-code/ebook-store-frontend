'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function NavLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <button
      className={className}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          router.push(href)
        })
      }}
    >
      {isPending ? "Loading..." : children}
    </button>
  )
}