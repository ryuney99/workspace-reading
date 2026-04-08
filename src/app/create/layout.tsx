import GNB from '@/components/layout/GNB'

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <GNB />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
