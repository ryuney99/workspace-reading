'use client'

import { ToastState } from '@/hooks/useToast'

interface ToastProps {
  toast: ToastState
  onClose: () => void
}

export default function Toast({ toast, onClose }: ToastProps) {
  if (!toast.visible) return null

  const bgColor = toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'

  return (
    <div
      className={`fixed bottom-6 right-6 ${bgColor} text-white px-5 py-3 rounded-card shadow-lg z-50 flex items-center gap-3 text-sm`}
    >
      <span>{toast.message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 text-lg leading-none">
        ×
      </button>
    </div>
  )
}
