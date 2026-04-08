import { DrillSentence } from '@/types'
import ItemNumber from './ItemNumber'

interface Props {
  sentence: DrillSentence
  num: number
}

/**
 * [A / B] 괄호를 파싱해서 선택지 뱃지로 렌더링
 * e.g. "She [runs / run] every day." →  She ① runs ② run every day.
 */
function renderWithChoices(sentence: string) {
  const parts = sentence.split(/(\[[^\]]+\])/g)

  return parts.map((part, i) => {
    const match = part.match(/^\[(.+?)\s*\/\s*(.+?)\]$/)
    if (match) {
      const [, a, b] = match
      return (
        <span key={i} className="inline-flex items-center gap-1 mx-0.5 align-middle">
          <span className="inline-flex items-center gap-0.5 bg-[#F0F0FF] border border-indigo-200 rounded px-1.5 py-0.5 text-[12.5px] font-semibold text-primary whitespace-nowrap">
            <span className="text-[10px] text-indigo-300 mr-0.5">①</span>{a.trim()}
          </span>
          <span className="text-gray-300 text-[11px]">/</span>
          <span className="inline-flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 text-[12.5px] font-semibold text-gray-600 whitespace-nowrap">
            <span className="text-[10px] text-gray-300 mr-0.5">②</span>{b.trim()}
          </span>
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
