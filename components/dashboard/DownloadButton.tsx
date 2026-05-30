'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/useToast'

interface Props {
    orderId: number
}

export default function DownloadButton({ orderId }: Props) {
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleDownload = async () => {
        setLoading(true)

        try {
            // Step 1 — Generate token
            const res = await fetch('/api/downloads/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order_id: orderId }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Failed to generate download link')
            }

            // Step 2 — Build Next.js download URL
            const token = data.download_url.split('/downloads/')[1]
            const nextjsDownloadUrl = `/api/downloads/${token}`

            // Step 3 — Check if file exists before opening
            const checkRes = await fetch(nextjsDownloadUrl)

            if (!checkRes.ok) {
                const errorData = await checkRes.json()
                throw new Error(errorData.message || 'File not available')
            }

            // Step 4 — File exists — trigger download
            toast.success('Download starting...')

            // Create a hidden anchor and click it — cleaner than window.open
            const a = document.createElement('a')
            a.href = nextjsDownloadUrl
            a.download = 'ebook.pdf'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Download failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className="w-full flex items-center justify-center gap-xs py-sm rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-all font-body-sm font-semibold disabled:opacity-50 cursor-pointer"
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Generating link...
                </>
            ) : (
                <>
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Download PDF
                </>
            )}
        </button>
    )
}