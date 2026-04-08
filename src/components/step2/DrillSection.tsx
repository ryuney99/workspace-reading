import { DrillSentence, DrillType, DRILL_LABELS } from '@/types'
import BonmunItem from './drills/BonmunItem'
import EobeopItem from './drills/EobeopItem'
import BlankItem from './drills/BlankItem'
import OrderItem from './drills/OrderItem'
import YeongjakItem from './drills/YeongjakItem'

interface DrillSectionProps {
  drillType: DrillType
  sentences: DrillSentence[]
  startIndex: number
  sectionNum: number
}

const INSTRUCTIONS: Record<DrillType, string> = {
  '본문확인': '주어진 문장을 읽고, 한글 해석을 확인하세요.',
  '어법어휘': '괄호 안에서 어법상 알맞은 것을 고르시오.',
  '빈칸채우기': '빈칸에 들어갈 알맞은 말을 쓰시오.',
  '순서배열': '주어진 단어를 올바르게 배열하여 문장을 완성하시오.',
  '영작': '우리말과 일치하도록 빈칸에 알맞은 말을 쓰시오.',
}

const SECTION_LABELS: Record<DrillType, string> = {
  '본문확인': 'READING',
  '어법어휘': 'GRAMMAR',
  '빈칸채우기': 'FILL IN',
  '순서배열': 'ORDER',
  '영작': 'WRITING',
}

export default function DrillSection({ drillType, sentences, startIndex, sectionNum }: DrillSectionProps) {
  return (
    <div>
      {/* Section banner — 이미지 참고 디자인 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-sm tracking-wide">
          {sectionNum} {SECTION_LABELS[drillType]}
        </div>
        <span className="text-sm font-bold text-gray-800 tracking-wide">
          {DRILL_LABELS[drillType]}
        </span>
      </div>

      {/* 지시문 */}
      <p className="text-[13px] font-semibold text-gray-700 mb-5 leading-relaxed">
        {INSTRUCTIONS[drillType]}
      </p>

      {/* 문항 목록 */}
      <div className="space-y-5">
        {sentences.map((sentence, i) => {
          const num = startIndex + i
          switch (drillType) {
            case '본문확인':
              return <BonmunItem key={sentence.id} sentence={sentence} num={num} />
            case '어법어휘':
              return <EobeopItem key={sentence.id} sentence={sentence} num={num} />
            case '빈칸채우기':
              return <BlankItem key={sentence.id} sentence={sentence} num={num} />
            case '순서배열':
              return <OrderItem key={sentence.id} sentence={sentence} num={num} />
            case '영작':
              return <YeongjakItem key={sentence.id} sentence={sentence} num={num} />
          }
        })}
      </div>
    </div>
  )
}
