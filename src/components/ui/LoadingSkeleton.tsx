export default function LoadingSkeleton() {
  return (
    <div
      className="bg-white shadow-lg mx-auto my-8 p-12 animate-pulse"
      style={{ width: 794, minHeight: 600 }}
    >
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-3" />
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-48" />
        </div>
        <div className="h-px bg-gray-200 mt-3" />
      </div>

      {/* Section skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-8">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
          {[1, 2, 3, 4, 5].map((j) => (
            <div key={j} className="flex gap-3 mb-3">
              <div className="h-3 bg-gray-200 rounded w-6" />
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-full mb-1.5" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
