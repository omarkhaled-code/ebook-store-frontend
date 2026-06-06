'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'

export default function NewEbookPage() {
  const router = useRouter()
  const toast = useToast()

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    is_published: false,
  })

  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [pdf, setPdf] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverImage(file)
    // Preview
    const reader = new FileReader()
    reader.onload = () => setCoverPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPdf(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validate
    if (!pdf) {
      setErrors({ pdf: 'PDF file is required' })
      return
    }

    setLoading(true)

    try {
      // Build FormData for file upload
      const data = new FormData()
      data.append('title', formData.title)
      data.append('author', formData.author)
      data.append('description', formData.description)
      data.append('price', formData.price)
      data.append('is_published', formData.is_published ? '1' : '0')
      data.append('pdf', pdf)
      if (coverImage) {
        data.append('cover_image', coverImage)
      }

      const res = await fetch('/api/admin/ebooks', {
        method: 'POST',
        body: data, // 👈 FormData — no Content-Type header needed
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.errors) {
          const errs: Record<string, string> = {}
          Object.keys(result.errors).forEach(key => {
            errs[key] = result.errors[key][0]
          })
          setErrors(errs)
          return
        }
        throw new Error(result.message || 'Failed to upload ebook')
      }

      toast.success('Ebook uploaded successfully! 🎉')
      router.push('/admin/ebooks')
      router.refresh()

    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl space-y-lg">

      <form onSubmit={handleSubmit} className="space-y-lg">

        {/* Basic Info */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
          <div className="px-lg py-md border-b border-outline-variant/30">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Basic Info</h2>
          </div>
          <div className="p-lg space-y-md">

            {/* Title */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Mastering Laravel"
                required
                className={`w-full px-md py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md
                  ${errors.title ? 'border-red-500' : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'}`}
              />
              {errors.title && <p className="text-red-500 text-[12px]">{errors.title}</p>}
            </div>

            {/* Author */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Omar Khaled"
                required
                className={`w-full px-md py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md
                  ${errors.author ? 'border-red-500' : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'}`}
              />
              {errors.author && <p className="text-red-500 text-[12px]">{errors.author}</p>}
            </div>

            {/* Description */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a detailed description..."
                required
                rows={4}
                className={`w-full px-md py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md resize-none
                  ${errors.description ? 'border-red-500' : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'}`}
              />
              {errors.description && <p className="text-red-500 text-[12px]">{errors.description}</p>}
            </div>

            {/* Price */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                Price (EGP) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-md top-1/2 -translate-y-1/2 font-body-md text-on-surface-variant">
                  EGP
                </span>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className={`w-full pl-16 pr-md py-sm bg-surface-container-low border rounded-lg outline-none transition-all font-body-md
                    ${errors.price ? 'border-red-500' : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10'}`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-[12px]">{errors.price}</p>}
            </div>

            {/* Publish toggle */}
            <div className="flex items-center justify-between py-sm px-md bg-surface-container-low rounded-lg">
              <div>
                <p className="font-body-sm font-semibold text-on-surface">Publish immediately</p>
                <p className="font-body-sm text-on-surface-variant text-[12px]">
                  If off — saved as draft
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, is_published: !prev.is_published }))}
                className={`relative w-12 h-6 rounded-full transition-all cursor-pointer
                  ${formData.is_published ? 'bg-primary' : 'bg-outline-variant'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all
                  ${formData.is_published ? 'left-7' : 'left-1'}`}
                />
              </button>
            </div>

          </div>
        </div>

        {/* Files */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
          <div className="px-lg py-md border-b border-outline-variant/30">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Files</h2>
          </div>
          <div className="p-lg space-y-md">

            {/* Cover Image */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                Cover Image <span className="text-on-surface-variant">(optional)</span>
              </label>
              <div className="flex items-start gap-md">
                {/* Preview */}
                <div className="w-24 h-32 rounded-xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-outline text-[32px]">image</span>
                  )}
                </div>
                <div className="flex-1 space-y-xs">
                  <label className="flex items-center gap-xs px-md py-sm border border-dashed border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">upload</span>
                    <span className="font-body-sm text-on-surface-variant">
                      {coverImage ? coverImage.name : 'Choose cover image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </label>
                  <p className="font-body-sm text-on-surface-variant text-[12px]">
                    JPG, PNG — max 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* PDF File */}
            <div className="space-y-xs">
              <label className="font-body-sm font-medium text-on-surface">
                PDF File <span className="text-red-500">*</span>
              </label>
              <label className={`flex items-center gap-xs px-md py-sm border border-dashed rounded-lg cursor-pointer hover:bg-surface-container-low transition-all
                ${errors.pdf ? 'border-red-500' : 'border-outline-variant'}`}>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                  picture_as_pdf
                </span>
                <span className={`font-body-sm ${pdf ? 'text-primary font-semibold' : 'text-on-surface-variant'}`}>
                  {pdf ? pdf.name : 'Choose PDF file'}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfChange}
                  className="hidden"
                />
              </label>
              {errors.pdf && <p className="text-red-500 text-[12px]">{errors.pdf}</p>}
              <p className="font-body-sm text-on-surface-variant text-[12px]">
                PDF only — max 50MB
              </p>
            </div>

          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-md">
          <button
            type="button"
            onClick={() => router.push('/admin/ebooks')}
            className="px-lg py-sm rounded-xl border border-outline-variant text-on-surface font-body-sm font-semibold hover:bg-surface-container-low transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary px-lg py-sm rounded-xl font-body-sm font-semibold disabled:opacity-50 flex items-center gap-xs shadow-md cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                Upload Ebook
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  )
}