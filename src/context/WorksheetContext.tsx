'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { DrillSentence, DrillType, Step1State, Worksheet, WorksheetContextValue } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const WorksheetContext = createContext<WorksheetContextValue | null>(null)

export function WorksheetProvider({ children }: { children: ReactNode }) {
  const [step1, setStep1] = useState<Step1State>({
    inputText: '',
    selectedDrills: [],
    blankCount: 1,
  })
  const [generatedSentences, setGeneratedSentences] = useState<DrillSentence[] | null>(null)
  const [worksheets, setWorksheets] = useLocalStorage<Worksheet[]>('drill-worksheets', [])
  const [printWorksheet, setPrintWorksheet] = useState<Worksheet | null>(null)

  const addWorksheet = (w: Worksheet) => {
    setWorksheets([w, ...worksheets])
  }

  const deleteWorksheet = (id: string) => {
    setWorksheets(worksheets.filter((w) => w.id !== id))
  }

  return (
    <WorksheetContext.Provider
      value={{
        step1,
        setStep1,
        generatedSentences,
        setGeneratedSentences,
        worksheets,
        addWorksheet,
        deleteWorksheet,
        printWorksheet,
        setPrintWorksheet,
      }}
    >
      {children}
    </WorksheetContext.Provider>
  )
}

export function useWorksheet() {
  const ctx = useContext(WorksheetContext)
  if (!ctx) throw new Error('useWorksheet must be used within WorksheetProvider')
  return ctx
}
