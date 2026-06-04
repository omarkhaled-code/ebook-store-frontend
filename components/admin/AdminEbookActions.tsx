'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import { useConfirmStore } from '@/store/confirmStore'

interface Props {
  ebookId: number
  isPublished: boolean
}

export default function AdminEbookActions({ ebookId, isPublished }: Props) {
  const [published, setPublished] = useState(isPublished)
  const [loading, setLoading] = useState(false)
  const { openConfirm } = useConfirmStore()
  const router = useRouter()
  const toast = useToast()

  const handleTogglePublish = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/ebooks/${ebookId}/toggle-publish`, {
        method: 'PATCH',
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setPublished(data.is_published)
      toast.success(data.message)

    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // const handleDelete = async () => {
  //   if (!confirm('Are you sure you want to delete this ebook?')) return

  //   setLoading(true)
  //   try {
  //     const res = await fetch(`/api/admin/ebooks/${ebookId}`, {
  //       method: 'DELETE',
  //     })

  //     if (!res.ok) {
  //       const data = await res.json()
  //       throw new Error(data.message)
  //     }

  //     toast.success('Ebook deleted successfully!')
  //     router.refresh() // 👈 refresh the page to update the list

  //   } catch (err) {
  //     toast.error(err instanceof Error ? err.message : 'Something went wrong')
  //   } finally {
  //     setLoading(false)
  //   }
  const handleDelete = () => {
    openConfirm('Are you sure you want to delete this ebook? This action cannot be undone.', async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/ebooks/${ebookId}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error('Failed to delete')

        toast.success('Ebook deleted successfully!')
        router.refresh()
      } catch (err) {
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    })
  }


  return (
    <div className="flex items-center gap-xs">

      {/* Toggle publish */}
      <button
        onClick={handleTogglePublish}
        disabled={loading}
        title={published ? 'Unpublish' : 'Publish'}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer
          ${published
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          }`}
      >
        <span className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          {published ? 'visibility' : 'visibility_off'}
        </span>
      </button>

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={loading}
        title="Delete ebook"
        className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]">delete</span>
      </button>

    </div>
  )
}