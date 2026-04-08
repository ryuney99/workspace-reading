import { DrillSentence, DrillType, ALL_DRILL_TYPES } from '@/types'
import DrillSection from './DrillSection'

interface A4PreviewProps {
  sentences: DrillSentence[]
  drillTypes: DrillType[]
  date?: string
  title: string
  onTitleChange?: (title: string) => void
}

function formatDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date()
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function A4Preview({ sentences, drillTypes, date, title, onTitleChange }: A4PreviewProps) {
  return (
    <div
      className="a4-paper bg-white shadow-lg mx-auto my-8"
      style={{ width: 794, minHeight: 1123, padding: '48px 56px' }}
    >
      {/* 상단 메타 정보 */}
      <div className="flex items-center justify-between mb-3">
        {/* 편집 가능한 제목 */}
        {onTitleChange ? (
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            maxLength={25}
            className="text-sm font-semibold text-gray-700 bg-transparent border-b border-dashed border-gray-300 focus:border-primary focus:outline-none px-0.5 min-w-0 w-48"
            placeholder="학습지 제목 입력"
          />
        ) : (
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        )}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>이름: <span className="inline-block border-b border-gray-400 w-20 mb-[-2px]">&nbsp;</span></span>
          <span>날짜: {formatDate(date)}</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-[2px] bg-primary mb-6" />

      {/* Drill sections — ALL_DRILL_TYPES 순서 고정 */}
      <div className="space-y-10">
        {ALL_DRILL_TYPES.filter((t) => drillTypes.includes(t)).map((drillType, idx) => {
          const startIndex = idx * sentences.length + 1
          return (
            <DrillSection
              key={drillType}
              drillType={drillType}
              sentences={sentences}
              startIndex={startIndex}
              sectionNum={idx + 1}
            />
          )
        })}
      </div>
    </div>
  )
}
