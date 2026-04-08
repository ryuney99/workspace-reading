import { DrillSentence } from '@/types'
import ItemNumber from './ItemNumber'

interface Props {
  sentence: DrillSentence
  num: number
}

export default function OrderItem({ sentence, num }: Props) {
  const data = sentence['순서배열']
  if (!data) return null

  return (
    <div className="flex items-start gap-2">
      <ItemNumber num={num} />
      <div className="flex-1">
        <p className="text-[12.5px] text-gray-500 leading-relaxed">
          {sentence.korean}
        </p>
        {/* 단어 칩 */}
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {data.words.map((word, i) => (
            <span
              key={i}
              className="px-2 py-0.5 border border-gray-300 text-gray-700 text-[12px] rounded-sm bg-gray-50"
            >
              {word}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[12.5px] text-gray-400">→</span>
          <div className="border-b border-gray-400 flex-1" style={{ height: 18 }} />
        </div>
      </div>
    </div>
  )
}
