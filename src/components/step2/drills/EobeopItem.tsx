import { DrillSentence } from '@/types'
import ItemNumber from './ItemNumber'

interface Props {
  sentence: DrillSentence
  num: number
}

/**
 * [A / B] 괄호를 파싱해서 동일한 스타일의 선택지로 렌더링
 * e.g. "She [runs / run] every day." → She [ runs / run ] every day.
 */
function renderWithChoices(sentence: string) {
  const parts = sentence.split(/(\[[^\]]+\])/g)

  return parts.map((part, i) => {
    const match = part.match(/^\[(.+?)\s*\/\s*(.+?)\]$/)
    if (match) {
      const [, a, b] = match
      return (
        <span
          key={i}
          className="inline-block mx-0.5 border border-gray-400 rounded px-2 py-0.5 text-[12.5px] font-medium text-gray-800 whitespace-nowrap align-middle"
        >
          {a.trim()} / {b.trim()}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function EobeopItem({ sentence, num }: Props) {
  const data = sentence['어법어휘']
  if (!data) return null

  return (
    <div className="flex items-start gap-2">
      <ItemNumber num={num} />
      <div className="flex-1">
        <p className="text-[13.5px] text-gray-800 leading-relaxed">
          {renderWithChoices(data.sentence)}
        </p>
      </div>
    </div>
  )
}
