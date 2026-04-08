'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWorksheet } from '@/context/WorksheetContext'
import A4Preview from '@/components/step2/A4Preview'
import DrillListPanel from '@/components/step2/DrillListPanel'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import Toast from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import { Worksheet } from '@/types'

const DEFAULT_TITLE = '문장 드릴 학습지'
const MAX_TITLE_LENGTH = 25

export default function Step2Page() {
  const router = useRouter()
  const { step1, generatedSentences, addWorksheet } = useWorksheet()
  const { toast, showToast, hideToast } = useToast()
  const [title, setTitle] = useState(DEFAULT_TITLE)

  // If no generated sentences, redirect to step1
  useEffect(() => {
    if (!generatedSentences) {
      router.replace('/create/step1')
    }
  }, [generatedSentences, router])

  const handleTitleChange = (value: string) => {
    if (value.length <= MAX_TITLE_LENGTH) {
      setTitle(value)
    }
  }

  const handleSave = () => {
    if (!generatedSentences) return

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      showToast('학습지 제목을 입력해 주세요.')
      return
    }

    const worksheet: Worksheet = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      createdAt: new Date().toISOString(),
      drillTypes: step1.selectedDrills,
      sentences: generatedSentences,
      inputText: step1.inputText,
      blankCount: step1.blankCount,
    }
    addWorksheet(worksheet)
    router.push('/worksheets')
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: A4 preview */}
          <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F4F4F6' }}>
            {generatedSentences ? (
              <A4Preview
                sentences={generatedSentences}
                drillTypes={step1.selectedDrills}
                title={title}
                onTitleChange={handleTitleChange}
              />
            ) : (
              <LoadingSkeleton />
            )}
          </div>

          {/* Right: Panel */}
          <div
            className="w-[380px] bg-white border-l border-gray-200 flex flex-col overflow-hidden flex-shrink-0"
            data-print-hide
          >
            {generatedSentences ? (
              <DrillListPanel
                drillTypes={step1.selectedDrills}
                sentences={generatedSentences}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-gray-400">드릴 생성 중...</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="h-14 bg-white border-t border-gray-200 flex items-center justify-between px-6 flex-shrink-0"
          data-print-hide
        >
          <button
            onClick={() => router.push('/create/step1')}
            className="flex items-center gap-1 text-sm font-medium text-primary border border-primary px-5 py-2.5 rounded-btn hover:bg-[#F0F0FF] transition-colors"
          >
            <span>←</span>
            <span>이전</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!generatedSentences}
            className={`px-5 py-2.5 rounded-btn text-sm font-semibold transition-all ${
              generatedSentences
                ? 'bg-primary text-white hover:bg-indigo-700 shadow-sm hover:shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            학습지 만들기
          </button>
        </div>
      </div>

      <Toast toast={toast} onClose={hideToast} />
    </>
  )
}
