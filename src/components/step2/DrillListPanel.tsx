'use client'

import { useState } from 'react'
import { DrillSentence, DrillType, DRILL_LABELS } from '@/types'

interface DrillListPanelProps {
  drillTypes: DrillType[]
  sentences: DrillSentence[]
}

export default function DrillListPanel({ drillTypes, sentences }: DrillListPanelProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'design'>('list')
  const total = drillTypes.length * sentences.length

  return (
    <div className="flex flex-col h-full" data-print-hide>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-4 pt-3 gap-4 flex-shrink-0">
        <button
          onClick={() => setActiveTab('list')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'list'
              ? 'text-primary border-b-2 border-primary -mb-px'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          드릴 목록
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'design'
              ? 'text-primary border-b-2 border-primary -mb-px'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          디자인 설정
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'list' ? (
          <div>
            {/* Summary */}
            <div className="mb-4 p-3 bg-[#F0F0FF] rounded-lg">
              <div className="text-xs text-gray-500">총 문항</div>
              <div className="text-xl font-bold text-primary mt-0.5">{total}문항</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {sentences.length}개 문장 × {drillTypes.length}종 드릴
              </div>
            </div>

            {/* Drill list */}
            <div className="space-y-2">
              {drillTypes.map((drillType, idx) => (
                <div
                  key={drillType}
                  className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-5">{idx + 1}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {DRILL_LABELS[drillType]}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                    {sentences.length}문항
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Design settings — UI only */
          <div className="space-y-4 opacity-60">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">폰트 크기</p>
              <div className="flex gap-2">
                {['소', '중', '대'].map((s) => (
                  <button
                    key={s}
                    disabled
                    className="flex-1 py-2 text-xs border border-gray-200 rounded-btn cursor-not-allowed"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">줄 간격</p>
              <input type="range" disabled className="w-full cursor-not-allowed" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">여백</p>
              <div className="flex gap-2">
                {['좁게', '보통', '넓게'].map((s) => (
                  <button
                    key={s}
                    disabled
                    className="flex-1 py-2 text-xs border border-gray-200 rounded-btn cursor-not-allowed"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 pt-2">추후 지원 예정</p>
          </div>
        )}
      </div>
    </div>
  )
}
