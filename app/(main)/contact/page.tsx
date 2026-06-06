'use client'
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

type formErrors = {
  name?: string
  email?: string
  message?: string
}
// app/contact/page.tsx
export default function ContactUsPage() {
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState<formErrors>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErrors({})
    // Client-side validation
    const errors: formErrors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (!formData.message.trim()) errors.message = 'Message is required'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Send data to API
    try {
      const res = await fetch('/api/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.message || 'Something went wrong. Please try again.')
        return
      }

      toast.success('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      toast.error('Network error. Please try again later.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 pt-32 space-y-12">

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-on-surface">Get in Touch</h1>
        <p className="text-on-surface-variant">
          We'd love to hear from you. Please fill out the form below.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-on-surface">Full Name</label>
          <input
            type="text"
            className={`w-full px-4 py-3 rounded-xl border  bg-surface outline-none focus:border-primary ${formErrors.name ? 'border-error' : 'border-outline-variant'}`}
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {formErrors.name && <p className="text-sm text-error">{formErrors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-on-surface">Email Address</label>
          <input
            type="email"
            className={`w-full px-4 py-3 rounded-xl border  bg-surface outline-none focus:border-primary ${formErrors.email ? 'border-error' : 'border-outline-variant'}`}
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {formErrors.email && <p className="text-sm text-error">{formErrors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-on-surface">Message</label>
          <textarea
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border  bg-surface outline-none focus:border-primary ${formErrors.message ? 'border-error' : 'border-outline-variant'}`}
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          {formErrors.message && <p className="text-sm text-error">{formErrors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-on-primary py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="text-center space-y-2 text-sm text-on-surface-variant">
        <p>Email: support@luminabooks.com</p>
        <p>Location: Cairo, Egypt</p>
      </div>

    </div>
  );
}