import { DrillSentence } from '@/types'
import ItemNumber from './ItemNumber'

interface Props {
  sentence: DrillSentence
  num: number
}

export default function YeongjakItem({ sentence, num }: Props) {
  return (
    <div className="flex items-start gap-2">
      <ItemNumber num={num} />
      <div className="flex-1">
        <p className="text-[12.5px] text-gray-500 leading-relaxed">
          {sentence.korean}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[12.5px] text-gray-400">→</span>
          <div className="border-b border-gray-400 flex-1" style={{ height: 18 }} />
        </div>
        <div className="border-b border-gray-200 mt-3" style={{ height: 18 }} />
      </div>
    </div>
  )
}
