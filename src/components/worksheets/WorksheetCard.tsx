'use client'

import { Worksheet, DRILL_LABELS } from '@/types'

interface WorksheetCardProps {
  worksheet: Worksheet
  onDelete: (id: string) => void
  onPrint: (worksheet: Worksheet) => void
}

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function WorksheetCard({ worksheet, onDelete, onPrint }: WorksheetCardProps) {
  const handleDelete = () => {
    if (confirm('이 학습지를 삭제하시겠습니까?')) {
      onDelete(worksheet.id)
    }
  }

  return (
    <div className="bg-white rounded-card shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Title */}
      <div>
        <h3 className="text-sm font-bold text-gray-900">
          {worksheet.title || '문장 드릴 학습지'} · {formatDate(worksheet.createdAt)}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          총 {worksheet.sentences.length}개 문장
        </p>
      </div>

      {/* Drill type badges */}
      <div className="flex flex-wrap gap-1.5">
        {worksheet.drillTypes.map((drillType) => (
          <span
            key={drillType}
            className="text-xs bg-[#F0F0FF] text-primary px-2 py-0.5 rounded-full font-medium"
          >
            {DRILL_LABELS[drillType]}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="text-xs text-gray-400">
        {worksheet.drillTypes.length}종 드릴 ·{' '}
        {worksheet.drillTypes.length * worksheet.sentences.length}문항
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <button
          onClick={() => onPrint(worksheet)}
          className="flex-1 py-2 text-xs font-semibold text-primary border border-primary rounded-btn hover:bg-[#F0F0FF] transition-colors"
        >
          출력
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 py-2 text-xs font-semibold text-gray-500 border border-gray-200 rounded-btn hover:bg-gray-50 hover:text-red-500 hover:border-red-300 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  )
}
