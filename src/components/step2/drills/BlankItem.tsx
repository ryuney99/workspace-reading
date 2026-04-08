import { DrillSentence } from '@/types'
import ItemNumber from './ItemNumber'

interface Props {
  sentence: DrillSentence
  num: number
}

export default function BlankItem({ sentence, num }: Props) {
  const data = sentence['빈칸채우기']
  if (!data) return null

  return (
    <div className="flex items-start gap-2">
      <ItemNumber num={num} />
      <div className="flex-1">
        {/* 영문 문장 */}
        <p className="text-[13.5px] text-gray-800 leading-relaxed">
          {data.sentence}
        </p>
        {/* 한글 뜻 */}
        <p className="text-[12px] text-gray-400 mt-0.5 leading-relaxed">
          {sentence.korean}
        </p>
        {/* 정답 쓰기 선 — 빈칸 개수만큼 */}
        <div className="mt-2 space-y-1.5">
          {data.answers.map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {data.answers.length > 1 && (
                <span className="text-[11px] text-gray-400 w-4 flex-shrink-0">({i + 1})</span>
              )}
              <span className="text-[12.5px] text-gray-400">→</span>
              <div className="border-b border-gray-400 flex-1" style={{ height: 18 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
