'use client'

import { useState, useCallback } from 'react'

export interface ToastState {
  message: string
  visible: boolean
  type: 'error' | 'success'
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    visible: false,
    type: 'error',
  })

  const showToast = useCallback((message: string, type: 'error' | 'success' = 'error') => {
    setToast({ message, visible: true, type })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 3000)
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  return { toast, showToast, hideToast }
}
