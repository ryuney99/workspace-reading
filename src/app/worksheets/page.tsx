'use client'

import Link from 'next/link'
import { useWorksheet } from '@/context/WorksheetContext'
import WorksheetCard from '@/components/worksheets/WorksheetCard'
import A4Preview from '@/components/step2/A4Preview'
import { Worksheet } from '@/types'

export default function WorksheetsPage() {
  const { worksheets, deleteWorksheet, printWorksheet, setPrintWorksheet } = useWorksheet()

  const handlePrint = (worksheet: Worksheet) => {
    setPrintWorksheet(worksheet)
    setTimeout(() => {
      window.print()
      // After print, reset
      setTimeout(() => setPrintWorksheet(null), 500)
    }, 100)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F6' }}>
      {/* Print target (hidden in normal view, shown on print) */}
      {printWorksheet && (
        <div id="print-target" className="hidden">
          <A4Preview
            sentences={printWorksheet.sentences}
            drillTypes={printWorksheet.drillTypes}
            date={printWorksheet.createdAt}
            title={printWorksheet.title || '문장 드릴 학습지'}
          />
        </div>
      )}

      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 h-[56px] flex items-center justify-between px-8" data-print-hide>
        <h1 className="text-base font-bold text-gray-900">내 학습지</h1>
        <Link
          href="/create/step1"
          className="flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-btn hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span>+</span>
          <span>새 학습지 만들기</span>
        </Link>
      </header>

      {/* Content */}
      <main className="p-8" data-print-hide>
        {worksheets.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-[#F0F0FF] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium mb-1">아직 학습지가 없어요</p>
            <p className="text-sm text-gray-400 mb-6">새 학습지를 만들어 보세요</p>
            <Link
              href="/create/step1"
              className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-btn hover:bg-indigo-700 transition-colors"
            >
              학습지 만들기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {worksheets.map((worksheet) => (
              <WorksheetCard
                key={worksheet.id}
                worksheet={worksheet}
                onDelete={deleteWorksheet}
                onPrint={handlePrint}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
