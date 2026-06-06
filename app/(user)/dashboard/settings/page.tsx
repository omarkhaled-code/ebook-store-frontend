'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/hooks/useToast'



export default function SettingsPage() {
  const { user, setUser } = useAuthStore()
  const toast = useToast()

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })


  useEffect(() => {


    if (!user) return

    setProfileData({
      name: user.name,
      email: user.email,
    })

  }, [user])


  const [profileLoading, setProfileLoading] = useState(false)

  // Password form state
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  })
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  // Validation errors
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({})
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({})

  // =========================
  // Handle Profile Update
  // =========================
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileErrors({})
    setProfileLoading(true)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })

      const data = await res.json()

      if (!res.ok) {
        // Handle validation errors
        if (data.errors) {
          const errors: Record<string, string> = {}
          Object.keys(data.errors).forEach(key => {
            errors[key] = data.errors[key][0]
          })
          setProfileErrors(errors)
          return
        }
        throw new Error(data.message || 'Failed to update profile')
      }

      // Update Zustand with new user data
      setUser(data.user)
      toast.success(data.message)

    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setProfileLoading(false)
    }
  }

  // =========================
  // Handle Password Update
  // =========================
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordErrors({})

    // Frontend validation
    if (passwordData.password !== passwordData.password_confirmation) {
      setPasswordErrors({ password_confirmation: 'Passwords do not match' })
      return
    }

    if (passwordData.password.length < 8) {
      setPasswordErrors({ password: 'Password must be at least 8 characters' })
      return
    }

    setPasswordLoading(true)

    try {
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          const errors: Record<string, string> = {}
          Object.keys(data.errors).forEach(key => {
            errors[key] = data.errors[key][0]
          })
          setPasswordErrors(errors)
          return
        }
        throw new Error(data.message || 'Failed to update password')
      }

      toast.success('Password updated successfully!')

      // Clear password fields
      setPasswordData({
        current_password: '',
        password: '',
        password_confirmation: '',
      })

    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="space-y-lg max-w-7xl">

      {/* Profile Section */}
      <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">

        {/* Section header */}
        <div className="px-lg py-md border-b border-outline-variant/30">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Profile Information
          </h2>
          <p className="font-body-sm text-on-surface-variant">
            Update your name and email address
          </p>
        </div>

        <form onSubmit={handleProfileSubmit} className="p-lg space-y-md">

          {/* Name */}
          <div className="space-y-xs">
            <label className="font-body-sm font-medium text-on-surface">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-md py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md
                ${profileErrors.name
                  ? 'border-red-500 focus:ring-red-100'
                  : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'
                }`}
            />
            {profileErrors.name && (
              <p className="text-red-500 text-[12px]">{profileErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-xs">
            <label className="font-body-sm font-medium text-on-surface">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-md py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md
                ${profileErrors.email
                  ? 'border-red-500 focus:ring-red-100'
                  : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'
                }`}
            />
            {profileErrors.email && (
              <p className="text-red-500 text-[12px]">{profileErrors.email}</p>
            )}
            {/* Email verification status */}
            <div className="flex items-center gap-xs">
              {user?.email_verified_at ? (
                <span className="flex items-center gap-1 text-green-600 text-[12px]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  Email verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-600 text-[12px]">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  Email not verified
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-xs">
            <button
              type="submit"
              disabled={profileLoading}
              className="bg-primary text-on-primary px-lg py-sm rounded-xl font-body-sm font-semibold disabled:opacity-50 flex items-center gap-xs cursor-pointer"
            >
              {profileLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Save Changes
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Password Section */}
      <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">

        <div className="px-lg py-md border-b border-outline-variant/30">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Change Password
          </h2>
          <p className="font-body-sm text-on-surface-variant">
            Make sure your account uses a strong password
          </p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="p-lg space-y-md">

          {/* Current Password */}
          <div className="space-y-xs">
            <label className="font-body-sm font-medium text-on-surface">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                value={passwordData.current_password}
                onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
                placeholder="••••••••"
                className={`w-full px-md pr-12 py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md
                  ${passwordErrors.current_password
                    ? 'border-red-500'
                    : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPasswords ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {passwordErrors.current_password && (
              <p className="text-red-500 text-[12px]">{passwordErrors.current_password}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-xs">
            <label className="font-body-sm font-medium text-on-surface">
              New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={passwordData.password}
              onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              className={`w-full px-md py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md
                ${passwordErrors.password
                  ? 'border-red-500'
                  : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'
                }`}
            />
            {passwordErrors.password && (
              <p className="text-red-500 text-[12px]">{passwordErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-xs">
            <label className="font-body-sm font-medium text-on-surface">
              Confirm New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={passwordData.password_confirmation}
              onChange={(e) => setPasswordData(prev => ({ ...prev, password_confirmation: e.target.value }))}
              placeholder="••••••••"
              className={`w-full px-md py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md
                ${passwordErrors.password_confirmation
                  ? 'border-red-500'
                  : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'
                }`}
            />
            {passwordErrors.password_confirmation && (
              <p className="text-red-500 text-[12px]">{passwordErrors.password_confirmation}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-xs">
            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-primary text-on-primary px-lg py-sm rounded-xl font-body-sm font-semibold disabled:opacity-50 flex items-center gap-xs cursor-pointer"
            >
              {passwordLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                  Update Password
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Danger Zone
      <div className="bg-surface rounded-2xl border border-red-200 overflow-hidden">
        <div className="px-lg py-md border-b border-red-200">
          <h2 className="font-headline-sm text-headline-sm text-red-600">
            Danger Zone
          </h2>
          <p className="font-body-sm text-on-surface-variant">
            Irreversible actions — be careful
          </p>
        </div>
        <div className="p-lg flex items-center justify-between gap-4 flex-col sm:gap-0 sm:flex-row ">
          <div>
            <p className="font-body-sm font-semibold text-on-surface">Delete Account</p>
            <p className="font-body-sm text-on-surface-variant text-[12px]">
              Permanently delete your account and all purchases
            </p>
          </div>
          <button className="border border-red-300 text-red-600 px-md py-sm rounded-xl font-body-sm font-semibold hover:bg-red-50 transition-all cursor-pointer">
            Delete Account
          </button>
        </div>
      </div> */}

    </div>
  )
}