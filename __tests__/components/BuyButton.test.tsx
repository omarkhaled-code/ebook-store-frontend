import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BuyButton from '@/components/ebook/BuyButton'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { act } from 'react'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

global.fetch = jest.fn()

describe('BuyButton', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    act(() => {
      useAuthStore.setState({ user: null, isAuthenticated: false })
      useToastStore.setState({ toasts: [] })
    })
  })

  it('shows buy button with correct price', () => {
    render(<BuyButton ebookId={1} price="149.99" />)
    expect(screen.getByText(/149.99/)).toBeInTheDocument()
  })

  it('redirects to auth when user is not logged in', async () => {
    render(<BuyButton ebookId={1} price="49.99" />)
    await userEvent.click(screen.getByRole('button'))
    expect(mockPush).toHaveBeenCalledWith('/auth')
  })

  it('redirects to verify-email when user is not verified', async () => {
    act(() => {
      useAuthStore.setState({
        isAuthenticated: true,
        user: {
          id: 1,
          name: 'Omar',
          email: 'omar@test.com',
          role: 'user',
          email_verified_at: null,
        },
      })
    })

    render(<BuyButton ebookId={1} price="49.99" />)
    await userEvent.click(screen.getByRole('button'))
    expect(mockPush).toHaveBeenCalledWith('/verify-email')
  })

  it('redirects to purchases when ebook already bought', async () => {
    act(() => {
      useAuthStore.setState({
        isAuthenticated: true,
        user: {
          id: 1,
          name: 'Omar',
          email: 'omar@test.com',
          role: 'user',
          email_verified_at: '2026-01-01T00:00:00.000Z',
        },
      })
    })

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({ message: 'You already purchased this ebook.' }),
    })

    render(<BuyButton ebookId={1} price="49.99" />)
    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard/purchases')
    })
  })

  it('shows loading state while processing', async () => {
    act(() => {
      useAuthStore.setState({
        isAuthenticated: true,
        user: {
          id: 1,
          name: 'Omar',
          email: 'omar@test.com',
          role: 'user',
          email_verified_at: '2026-01-01T00:00:00.000Z',
        },
      })
    })

    ;(global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    )

    render(<BuyButton ebookId={1} price="49.99" />)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })
})
