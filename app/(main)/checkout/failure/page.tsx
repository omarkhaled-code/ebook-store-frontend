import Link from 'next/link'

export default function CheckoutFailurePage() {
  return (
    <main className="flex-grow flex items-center justify-center px-gutter pt-32 pb-16">
      <div className="w-full max-w-lg">
        <div className="bg-surface-container-lowest rounded-xl p-xl text-center border border-outline-variant shadow-xl">

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-lg ring-8 ring-red-50">
            <span
              className="material-symbols-outlined text-[40px] text-red-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cancel
            </span>
          </div>

          <h1 className="font-headline-md text-headline-md text-on-surface mb-sm">
            Payment Cancelled
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
            Your payment was cancelled. No charges were made.
          </p>

          <Link
            href="/ebooks"
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-sm flex items-center justify-center gap-xs shadow-lg"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Ebooks
          </Link>

        </div>
      </div>
    </main>
  )
}