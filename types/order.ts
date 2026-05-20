export type OrderStatus = 'pending' | 'paid' | 'failed'

export type Order = {
  order_id: number
  amount: string
  status: OrderStatus
  paid_at: string | null
  ebook: {
    id: number
    title: string
    slug: string
    author: string
    cover_image_path: string | null
  }
}

export type DownloadResponse = {
  message: string
  download_url: string
  expires_at: string
}