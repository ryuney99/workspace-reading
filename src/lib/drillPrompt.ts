import { DrillType } from '@/types'

export function buildDrillPrompt(
  text: string,
  drillTypes: DrillType[],
  blankCount: 1 | 2 | 3 = 1
): Array<{ role: 'user'; content: string }> {
  const drillSchemaLines: string[] = []

  if (drillTypes.includes('어법어휘')) {
    drillSchemaLines.push(`      "어법어휘": {
        "sentence": "<sentence with one bracketed choice, e.g. He [run / runs] fast.>",
        "answer": "<correct option>",
        "distractor": "<wrong option>"
      }`)
  }

  if (drillTypes.includes('빈칸채우기')) {
    const answersExample = blankCount === 1
      ? '["<the removed word>"]'
      : blankCount === 2
      ? '["<first removed word>", "<second removed word>"]'
      : '["<first removed word>", "<second removed word>", "<third removed word>"]'

    drillSchemaLines.push(`      "빈칸채우기": {
        "sentence": "<sentence with exactly ${blankCount} key content word(s) replaced by _____, each marked sequentially>",
        "answers": ${answersExample}
      }`)
  }

  if (drillTypes.includes('순서배열')) {
    drillSchemaLines.push(`      "순서배열": {
        "words": ["<shuffled>", "<word>", "<tokens>"],
        "answer": "<correctly ordered full sentence>"
      }`)
  }

  if (drillTypes.includes('영작')) {
    drillSchemaLines.push(`      "영작": {
        "korean": "<natural Korean translation for translation exercise>"
      }`)
  }

  const drillSchemaBlock = drillSchemaLines.length > 0
    ? ',\n' + drillSchemaLines.join(',\n')
    : ''

  const drillRules: string[] = [
    '- Extract ALL complete English sentences from the input text.',
    '- For 본문확인: always fill "original" and "korean" fields for every sentence.',
  ]

  if (drillTypes.includes('어법어휘')) {
    drillRules.push('- For 어법어휘: pick a grammatically interesting word (verb form, adjective, preposition). Create one plausible wrong option.')
  }
  if (drillTypes.includes('빈칸채우기')) {
    drillRules.push(`- For 빈칸채우기: remove exactly ${blankCount} key content word(s) (nouns, verbs, or adjectives — NOT articles or prepositions). Replace each with _____. The "answers" array must have exactly ${blankCount} element(s) in order.`)
  }
  if (drillTypes.includes('순서배열')) {
    drillRules.push('- For 순서배열: shuffle the word tokens so they are NOT in original order.')
  }
  if (drillTypes.includes('영작')) {
    drillRules.push('- For 영작: provide a natural Korean translation (may match the "korean" field).')
  }
  drillRules.push('- Respond ONLY with the JSON object. No markdown fences, no extra text.')

  const userMessage = `INPUT TEXT:
${text}

REQUESTED DRILL TYPES: ${drillTypes.join(', ')}

Generate a JSON object with this exact shape:
{
  "sentences": [
    {
      "id": <number starting at 1>,
      "original": "<exact English sentence>",
      "korean": "<natural Korean translation>"${drillSchemaBlock}
    }
  ]
}

RULES:
${drillRules.join('\n')}`

  return [
    {
      role: 'user',
      content: userMessage,
    },
  ]
}
