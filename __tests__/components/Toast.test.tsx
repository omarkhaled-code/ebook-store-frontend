import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToastContainer from '@/components/ui/Toast'
import { useToastStore } from '@/store/toastStore'

// Helper to add a toast
const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
  act(() => {
    useToastStore.getState().addToast(message, type)
  })
}

describe('Toast System', () => {

  beforeEach(() => {
    // Clear all toasts before each test
    act(() => {
      useToastStore.setState({ toasts: [] })
    })
  })

  it('shows a success toast', () => {
    render(<ToastContainer />)
    addToast('Payment successful!', 'success')
    expect(screen.getByText('Payment successful!')).toBeInTheDocument()
  })

  it('shows an error toast', () => {
    render(<ToastContainer />)
    addToast('Something went wrong', 'error')
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('shows a warning toast', () => {
    render(<ToastContainer />)
    addToast('Please verify your email', 'warning')
    expect(screen.getByText('Please verify your email')).toBeInTheDocument()
  })

  it('does not show duplicate toasts', () => {
    render(<ToastContainer />)
    addToast('Same message', 'success')
    addToast('Same message', 'success') // duplicate
    const toasts = screen.getAllByText('Same message')
    expect(toasts).toHaveLength(1) // only one shown
  })

  it('removes toast when close button clicked', async () => {
    render(<ToastContainer />)
    addToast('Click to close', 'info')

    expect(screen.getByText('Click to close')).toBeInTheDocument()

    const closeButton = screen.getByRole('button')
    await userEvent.click(closeButton)

    expect(screen.queryByText('Click to close')).not.toBeInTheDocument()
  })

  it('limits toasts to maximum 3', () => {
    render(<ToastContainer />)
    addToast('Toast 1', 'success')
    addToast('Toast 2', 'error')
    addToast('Toast 3', 'warning')
    addToast('Toast 4', 'info') // should replace Toast 1

    expect(screen.queryByText('Toast 1')).not.toBeInTheDocument()
    expect(screen.getByText('Toast 4')).toBeInTheDocument()
  })
})