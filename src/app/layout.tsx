import type { Metadata } from 'next'
import './globals.css'
import { WorksheetProvider } from '@/context/WorksheetContext'

export const metadata: Metadata = {
  title: '문장 드릴 학습지 만들기',
  description: '잉글리시플랫 문장 드릴 학습지 생성기',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <WorksheetProvider>{children}</WorksheetProvider>
      </body>
    </html>
  )
}
