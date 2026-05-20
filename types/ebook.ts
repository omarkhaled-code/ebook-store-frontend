export type Ebook = {
  id: number
  title: string
  slug: string
  description: string
  author: string
  cover_image_path: string | null
  price: string
  created_at: string
  updated_at: string
}

export type EbookPagination = {
  data: Ebook[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}