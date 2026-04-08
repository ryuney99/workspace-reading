'use client'

import { DrillType, ALL_DRILL_TYPES, DRILL_LABELS } from '@/types'

const DRILL_DESCRIPTIONS: Record<DrillType, string> = {
  '본문확인': '영어 문장 + 한글 해석',
  '어법어휘': '2지선다 선택형',
  '빈칸채우기': '핵심 어휘 빈칸 처리',
  '순서배열': '단어 순서 맞추기',
  '영작': '한글만 보고 영작',
}

interface DrillSelectorPanelProps {
  selectedDrills: DrillType[]
  onChange: (drills: DrillType[]) => void
  blankCount: 1 | 2 | 3
  onBlankCountChange: (count: 1 | 2 | 3) => void
}

export default function DrillSelectorPanel({
  selectedDrills,
  onChange,
  blankCount,
  onBlankCountChange,
}: DrillSelectorPanelProps) {
  const isAllSelected = selectedDrills.length === ALL_DRILL_TYPES.length

  const toggleAll = () => {
    if (isAllSelected) {
      onChange([])
    } else {
      onChange([...ALL_DRILL_TYPES])
    }
  }

  const toggle = (drill: DrillType) => {
    if (selectedDrills.includes(drill)) {
      onChange(selectedDrills.filter((d) => d !== drill))
    } else {
      onChange([...selectedDrills, drill])
    }
  }

  return (
    <div className="w-[300px] bg-white rounded-card shadow-sm flex flex-col overflow-hidden flex-shrink-0">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-sm font-semibold text-gray-800">드릴 종류 선택</h2>
        <p className="text-xs text-gray-400 mt-0.5">원하는 드릴을 1개 이상 선택하세요</p>
      </div>

      {/* 전체 선택 */}
      <div className="px-3 pt-2 pb-1 flex-shrink-0">
        <label className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
          isAllSelected ? 'bg-[#F0F0FF]' : 'hover:bg-gray-50'
        }`}>
          <div className="relative flex-shrink-0">
            <input type="checkbox" checked={isAllSelected} onChange={toggleAll} className="sr-only" />
            <div className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-colors ${
              isAllSelected ? 'bg-primary border-primary' : 'bg-white border-gray-300'
            }`}>
              {isAllSelected && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {!isAllSelected && selectedDrills.length > 0 && (
                <div className="w-2 h-0.5 bg-gray-400 rounded" />
              )}
            </div>
          </div>
          <span className={`text-sm font-semibold ${isAllSelected ? 'text-primary' : 'text-gray-700'}`}>
            전체 선택
          </span>
          <span className="ml-auto text-xs text-gray-400">
            {selectedDrills.length}/{ALL_DRILL_TYPES.length}
          </span>
        </label>
        <div className="border-t border-gray-100 mt-1" />
      </div>

      {/* Drill list */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
        {ALL_DRILL_TYPES.map((drill) => {
          const checked = selectedDrills.includes(drill)
          return (
            <div key={drill}>
              <label
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  checked ? 'bg-[#F0F0FF]' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative mt-0.5 flex-shrink-0">
                  <input type="checkbox" checked={checked} onChange={() => toggle(drill)} className="sr-only" />
                  <div className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-colors ${
                    checked ? 'bg-primary border-primary' : 'bg-white border-gray-300'
                  }`}>
                    {checked && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-medium ${checked ? 'text-primary' : 'text-gray-700'}`}>
                    {DRILL_LABELS[drill]}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{DRILL_DESCRIPTIONS[drill]}</div>
                </div>
              </label>

              {/* 빈칸채우기 선택 시 빈칸 개수 설정 */}
              {drill === '빈칸채우기' && checked && (
                <div className="ml-10 mb-1 px-3 py-2 bg-[#F0F0FF] rounded-lg border border-indigo-100">
                  <p className="text-xs text-gray-500 mb-1.5 font-medium">빈칸 개수</p>
                  <div className="flex gap-2">
                    {([1, 2, 3] as const).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => onBlankCountChange(n)}
                        className={`w-8 h-8 rounded-md text-sm font-semibold transition-colors ${
                          blankCount === n
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected count */}
      <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0">
        <span className="text-xs text-gray-500">
          {selectedDrills.length > 0
            ? `${selectedDrills.length}개 선택됨`
            : '선택된 드릴이 없습니다'}
        </span>
      </div>
    </div>
  )
}
