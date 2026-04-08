import { DrillSentence } from '@/types'
import ItemNumber from './ItemNumber'

interface Props {
  sentence: DrillSentence
  num: number
}

export default function BonmunItem({ sentence, num }: Props) {
  return (
    <div className="flex items-start gap-2">
      <ItemNumber num={num} />
      <div className="flex-1">
        <p className="text-[13.5px] text-gray-800 leading-relaxed">
          {sentence.original}
        </p>
        <p className="text-[12.5px] text-gray-500 mt-1.5 flex items-start gap-1.5">
          <span className="text-gray-400 flex-shrink-0">→</span>
          <span>{sentence.korean}</span>
        </p>
      </div>
    </div>
  )
}
