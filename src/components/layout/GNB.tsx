'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function GNB() {
  const pathname = usePathname()
  const step = pathname.includes('step2') ? 2 : 1

  return (
    <header
      className="h-[56px] bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0"
      data-print-hide
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-gray-400">문장 드릴 학습지 만들기</span>
        <span className="text-gray-300 mx-1">|</span>
        <span className="text-gray-800 font-semibold">STEP {step}</span>
      </div>
      <Link
        href="/worksheets"
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors px-3 py-1.5 rounded-btn hover:bg-gray-100"
      >
        <span className="text-base">×</span>
        <span>닫기</span>
      </Link>
    </header>
  )
}
