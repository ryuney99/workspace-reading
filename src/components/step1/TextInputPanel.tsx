'use client'

interface TextInputPanelProps {
  value: string
  onChange: (value: string) => void
  sentenceCount: number
}

export default function TextInputPanel({ value, onChange, sentenceCount }: TextInputPanelProps) {
  return (
    <div className="flex-1 bg-white rounded-card shadow-sm flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6 pt-4 gap-6 flex-shrink-0">
        <button className="pb-3 text-sm font-semibold text-primary border-b-2 border-primary -mb-px">
          텍스트 입력
        </button>
        <button
          disabled
          className="pb-3 text-sm font-medium text-gray-400 cursor-not-allowed flex items-center gap-2"
        >
          이미지·PDF 업로드
          <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
            추후 지원 예정
          </span>
        </button>
      </div>

      {/* Textarea */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <textarea
          className="flex-1 w-full resize-none border border-gray-200 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors leading-relaxed"
          placeholder="영어 지문을 붙여 넣거나, 직접 입력해주세요. 문장 단위 드릴 학습지가 자동 생성됩니다."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* Sentence count preview */}
        {value.trim() && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>
              <span className="font-semibold text-primary">{sentenceCount}개</span> 문장 감지됨
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
