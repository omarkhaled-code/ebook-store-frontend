'use client'

import { useConfirmStore } from '@/store/confirmStore'

export default function ConfirmModal() {
  const { isOpen, message, onConfirm, closeConfirm } = useConfirmStore()

  if (!isOpen) return null

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-sm" >
      <div className="bg-white p-md rounded-xl shadow-xl w-full max-w-[400px]">
        <h3 className="font-headline-sm text-on-surface mb-sm">Confirm Action</h3>
        <p className="text-body-md text-on-surface-variant mb-md">{message}</p>

        <div className="flex gap-xs justify-end">
          <button
            onClick={closeConfirm}
            className="px-md py-xs rounded-lg hover:bg-surface-variant transition-colors cursor-pointer text-on-surface"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm()
              closeConfirm()
            }}
            className="px-md py-xs rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div >
  )
}