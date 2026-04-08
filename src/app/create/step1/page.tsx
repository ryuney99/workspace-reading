'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWorksheet } from '@/context/WorksheetContext'
import { DrillType, GenerateDrillResponse } from '@/types'
import TextInputPanel from '@/components/step1/TextInputPanel'
import DrillSelectorPanel from '@/components/step1/DrillSelectorPanel'
import Toast from '@/components/ui/Toast'
import Spinner from '@/components/ui/Spinner'
import { useToast } from '@/hooks/useToast'

const MAX_SENTENCES = 50

function parseSentences(text: string): number {
  if (!text.trim()) return 0
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3).length
}

export default function Step1Page() {
  const router = useRouter()
  const { step1, setStep1, setGeneratedSentences } = useWorksheet()
  const { toast, showToast, hideToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const sentenceCount = parseSentences(step1.inputText)
  const isOverLimit = sentenceCount > MAX_SENTENCES
  const canProceed =
    step1.inputText.trim().length > 0 &&
    step1.selectedDrills.length > 0 &&
    !isOverLimit &&
    !isLoading

  const handleNext = async () => {
    if (!canProceed) return
    setIsLoading(true)

    try {
      const res = await fetch('/api/generate-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: step1.inputText,
          drillTypes: step1.selectedDrills,
          blankCount: step1.blankCount,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '알 수 없는 오류가 발생했습니다.')
      }

      const data: GenerateDrillResponse = await res.json()
      setGeneratedSentences(data.sentences)
      router.push('/create/step2')
    } catch (err) {
      const msg = err instanceof Error ? err.message : '드릴 생성 중 오류가 발생했습니다.'
      showToast(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Main content */}
        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          <TextInputPanel
            value={step1.inputText}
            onChange={(v) => setStep1({ ...step1, inputText: v })}
            sentenceCount={sentenceCount}
          />
          <DrillSelectorPanel
            selectedDrills={step1.selectedDrills}
            onChange={(drills: DrillType[]) => setStep1({ ...step1, selectedDrills: drills })}
            blankCount={step1.blankCount}
            onBlankCountChange={(count) => setStep1({ ...step1, blankCount: count })}
          />
        </div>

        {/* Bottom status bar */}
        <div
          className="h-14 bg-white border-t border-gray-200 flex items-center justify-between px-6 flex-shrink-0"
          data-print-hide
        >
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              총{' '}
              <span className={`font-semibold ${isOverLimit ? 'text-red-500' : 'text-gray-900'}`}>
                {sentenceCount}개
              </span>{' '}
              문장
            </span>
            {isOverLimit && (
              <span className="text-xs text-red-500 font-medium">
                최대 {MAX_SENTENCES}문장까지 가능합니다
              </span>
            )}
          </div>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-btn text-sm font-semibold transition-all ${
              canProceed
                ? 'bg-primary text-white hover:bg-indigo-700 shadow-sm hover:shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <Spinner size={16} />
                <span>드릴 생성 중...</span>
              </>
            ) : (
              <>
                <span>다음 단계</span>
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </div>

      <Toast toast={toast} onClose={hideToast} />
    </>
  )
}
