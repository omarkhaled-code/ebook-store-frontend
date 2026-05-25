'use client'
import { useEffect, useRef } from 'react'
import { useToast } from "@/hooks/useToast"
import { useAuthStore } from "@/store/authStore"

export default function RunToast() {
    const { user, isAuthenticated } = useAuthStore()
    const toast = useToast()
    const hasShown = useRef(false) // 👈 tracks if we already showed it

    useEffect(() => {
        if (hasShown.current) return // 👈 already shown — skip

        if (!isAuthenticated) {
            toast.warning("Please log in to purchase ebooks!")
            hasShown.current = true // 👈 mark as shown
        }
        if (isAuthenticated && !user?.email_verified_at) {
            toast.warning("Please verify your email to purchase ebooks!")
            hasShown.current = true // 👈 mark as shown
        }
    }, [])

    return null
}