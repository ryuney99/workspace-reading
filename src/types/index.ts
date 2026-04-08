export type DrillType = '본문확인' | '어법어휘' | '빈칸채우기' | '순서배열' | '영작'

export const DRILL_LABELS: Record<DrillType, string> = {
  '본문확인': '본문 확인',
  '어법어휘': '어법/어휘 고르기',
  '빈칸채우기': '빈칸 채우기',
  '순서배열': '순서 배열',
  '영작': '영작',
}

export const ALL_DRILL_TYPES: DrillType[] = [
  '본문확인',
  '어법어휘',
  '빈칸채우기',
  '순서배열',
  '영작',
]

export interface EobeopData {
  sentence: string
  answer: string
  distractor: string
}

export interface BlankData {
  sentence: string
  answers: string[]   // 빈칸 1~3개에 대한 정답 배열
}

export interface OrderData {
  words: string[]
  answer: string
}

export interface YeongjakData {
  korean: string
}

export interface DrillSentence {
  id: number
  original: string
  korean: string
  '어법어휘'?: EobeopData
  '빈칸채우기'?: BlankData
  '순서배열'?: OrderData
  '영작'?: YeongjakData
}

export interface GenerateDrillResponse {
  sentences: DrillSentence[]
}

export interface Worksheet {
  id: string
  title: string
  createdAt: string
  drillTypes: DrillType[]
  sentences: DrillSentence[]
  inputText: string
  blankCount: number
}

export interface Step1State {
  inputText: string
  selectedDrills: DrillType[]
  blankCount: 1 | 2 | 3
}

export interface WorksheetContextValue {
  step1: Step1State
  setStep1: (s: Step1State) => void
  generatedSentences: DrillSentence[] | null
  setGeneratedSentences: (s: DrillSentence[]) => void
  worksheets: Worksheet[]
  addWorksheet: (w: Worksheet) => void
  deleteWorksheet: (id: string) => void
  printWorksheet: Worksheet | null
  setPrintWorksheet: (w: Worksheet | null) => void
}
