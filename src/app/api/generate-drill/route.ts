import { NextRequest, NextResponse } from 'next/server'
import { groq } from '@/lib/groq'
import { buildDrillPrompt } from '@/lib/drillPrompt'
import { DrillType, GenerateDrillResponse } from '@/types'

const SYSTEM_INSTRUCTION =
  'You are an English drill worksheet generator for Korean middle/high school students. ' +
  'Always respond with valid JSON only. No markdown fences, no commentary outside the JSON.'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, drillTypes, blankCount = 1 } = body as { text: string; drillTypes: DrillType[]; blankCount?: 1 | 2 | 3 }

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: '텍스트를 입력해 주세요.' }, { status: 400 })
    }
    if (!drillTypes || !Array.isArray(drillTypes) || drillTypes.length === 0) {
      return NextResponse.json({ error: '드릴 종류를 하나 이상 선택해 주세요.' }, { status: 400 })
    }

    const [userMessage] = buildDrillPrompt(text, drillTypes, blankCount)
    const userText =
      typeof userMessage.content === 'string'
        ? userMessage.content
        : (userMessage.content as Array<{ type: string; text: string }>)[0]?.text ?? ''

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        { role: 'user', content: userText },
      ],
      temperature: 0,
      max_tokens: 8192,
      response_format: { type: 'json_object' },
    })

    const raw = completion.choices[0]?.message?.content ?? ''
    const parsed: GenerateDrillResponse = JSON.parse(raw)

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('[generate-drill] error:', err)

    const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'

    if (message.includes('401') || message.includes('invalid_api_key')) {
      return NextResponse.json(
        { error: 'API 키가 올바르지 않습니다. .env.local 파일의 GROQ_API_KEY를 확인해 주세요.' },
        { status: 401 }
      )
    }
    if (message.includes('429') || message.includes('rate_limit')) {
      return NextResponse.json(
        { error: 'AI 서버 사용량 한도에 도달했습니다. 1분 후 다시 시도해 주세요.' },
        { status: 429 }
      )
    }
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'AI 응답 파싱에 실패했습니다. 다시 시도해 주세요.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
