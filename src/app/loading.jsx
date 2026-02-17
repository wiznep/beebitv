export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-28 cyber-skeleton rounded" />
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="h-12 cyber-skeleton rounded-lg w-3/4 mb-3" />
          <div className="h-12 cyber-skeleton rounded-lg w-1/2 mb-5" />
          <div className="h-5 cyber-skeleton rounded w-full max-w-xl mb-2" />
          <div className="h-5 cyber-skeleton rounded w-2/3 mb-8" />
          <div className="flex gap-3">
            <div className="h-12 w-40 cyber-skeleton rounded-lg" />
            <div className="h-12 w-40 cyber-skeleton rounded-lg" />
          </div>
        </div>
      </section>

      {/* Live Now skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="h-4 w-24 cyber-skeleton rounded mb-5" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[280px] shrink-0">
              <div className="cyber-card rounded-lg p-4 h-[200px]">
                <div className="flex justify-between mb-3">
                  <div className="h-4 w-16 cyber-skeleton rounded" />
                  <div className="h-4 w-12 cyber-skeleton rounded" />
                </div>
                <div className="h-5 w-full cyber-skeleton rounded mb-3" />
                <div className="flex justify-between mb-4">
                  <div className="h-4 w-20 cyber-skeleton rounded" />
                  <div className="h-4 w-8 cyber-skeleton rounded" />
                  <div className="h-4 w-20 cyber-skeleton rounded" />
                </div>
                <div className="h-9 w-full cyber-skeleton rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sports grid skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="h-4 w-28 cyber-skeleton rounded mb-5" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="h-20 cyber-skeleton rounded-lg" />
          ))}
        </div>
      </section>

      {/* Featured skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="h-4 w-32 cyber-skeleton rounded mb-5" />
        <div className="cyber-card rounded-xl p-6 sm:p-8 h-48" />
      </section>
    </>
  );
}
