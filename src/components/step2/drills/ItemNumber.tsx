export default function ItemNumber({ num }: { num: number }) {
  return (
    <div className="flex items-center flex-shrink-0 w-7">
      <span className="text-sm font-bold text-gray-700">{num}.</span>
    </div>
  )
}
