export default function EbookDetailSkeleton() {
  return (
    <main className="pt-24 pb-xl animate-pulse">
      <div className="max-w-container-max mx-auto px-4 md:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Cover Placeholder */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="rounded-lg aspect-[3/4] bg-surface-container-high" />
          </div>

          {/* Content Placeholder */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-lg">
            <div className="flex flex-col gap-4">
              <div className="h-6 w-24 bg-surface-container-high rounded-full" />
              <div className="h-12 w-3/4 bg-surface-container-high rounded-lg" />
              <div className="h-8 w-1/3 bg-surface-container-high rounded-lg" />
            </div>

            {/* Price Card Placeholder */}
            <div className="h-40 bg-surface-container-low rounded-2xl border border-outline-variant" />

            {/* Description Placeholder */}
            <div className="space-y-4">
              <div className="h-8 w-1/4 bg-surface-container-high rounded-lg" />
              <div className="h-4 w-full bg-surface-container-high rounded" />
              <div className="h-4 w-full bg-surface-container-high rounded" />
              <div className="h-4 w-2/3 bg-surface-container-high rounded" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}