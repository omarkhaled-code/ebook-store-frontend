import { laravelFetch } from '@/lib/laravel'
import { notFound } from 'next/navigation'
// import Image from 'next/image'
import RelatedEbooks from '@/components/ebook/RelatedEbooks'
import RunToast from '@/components/ui/RunToast'
import BuyButton from '@/components/ebook/BuyButton'

import { Suspense } from 'react'
import EbookDetailSkeleton from '@/components/ebook/EbookSkeleton'
import Image from 'next/image'



const EbookImage = ({ image }: { image?: string | null }) => {
  console.log(image)
  if (!image) {
    return (
      <Image alt="Book Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPwGdVHdJiVfRJL-EjdupqDbsLCKeS3DcpUX_w9nZ8Skl___36-CzCmZLZQoZBARwa0BwEhu33Dho2MBS8e5F31e3EoMT38LNRxFrng4NZrdKFcIq8vLtyDph45FTSC2beodJY9R32kzIQlpTODH14n-SQDgeD5uu6XWq8ru-FwekXgiIKx6ohmmoeFEa_SAI8gziaoZW_hbbIplN4dZnSRJy_WMueHUYLmZ5TP8geX2P32IIR7FiKWqc5rWIfG1VdH1z-FJr_Lg"
        width={400}
        height={500} 
        unoptimized
      />
    )

  }
  else {
    const fullImageUrl = `${process.env.NEXT_PUBLIC_LARAVEL_IMG_URL}/${image.startsWith('/') ? image.substring(1) : image}`;
    return (

      <Image
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        src={fullImageUrl}
        alt="Ebook Cover"
        width={400}
        height={500}
        unoptimized
        
      />
    )
  }
}

interface Props {
  params: Promise<{ slug: string }>
}


async function EbookContent({ slug }: { slug: string }) {
  const res = await laravelFetch(`/ebooks/${slug}`);
  if (!res.ok) notFound();
  const { data: ebook } = await res.json();

  return (
    // هنا ضع كل محتوى الـ JSX الأصلي الخاص بك (الذي يبدأ بـ <main>)
    <main className="pt-24 pb-xl">
      <RunToast />
      <div className="max-w-container-max mx-auto px-4 md:px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* <!-- Book Cover & Actions --> */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <div className="book-shadow rounded-lg overflow-hidden aspect-[3/4] mb-md relative group">
                <EbookImage image={ebook.cover_image_path} />
              </div>
            </div>
          </div>
          {/* <!-- Book Info --> */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-lg">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 bg-secondary-container/10 text-secondary border border-secondary-container/20 rounded-full font-label-mono text-label-mono">BEST
                  SELLER</span>

              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface mb-2">{ebook.title}</h1>
              <p className="font-headline-sm text-headline-sm text-primary mb-6">by {ebook.author}</p>
              {/* <!-- <div className="flex items-center gap-6 py-4 border-y border-outline-variant">
                            <div className="flex items-center gap-2">
                                <div className="flex text-tertiary">
                                    <span className="material-symbols-outlined"
                                        style="font-variation-settings: 'FILL' 1;">star</span>
                                    <span className="material-symbols-outlined"
                                        style="font-variation-settings: 'FILL' 1;">star</span>
                                    <span className="material-symbols-outlined"
                                        style="font-variation-settings: 'FILL' 1;">star</span>
                                    <span className="material-symbols-outlined"
                                        style="font-variation-settings: 'FILL' 1;">star</span>
                                    <span className="material-symbols-outlined"
                                        style="font-variation-settings: 'FILL' 0.5;">star_half</span>
                                </div>
                                <span className="font-body-md text-body-md font-semibold">4.8</span>
                                <span className="text-on-surface-variant text-body-sm font-body-sm">(1,240 Reviews)</span>
                            </div>
                            <div className="h-6 w-px bg-outline-variant"></div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-on-surface-variant">language</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant">English, French,
                                    Spanish</span>
                            </div>
                        </div> --> */}
            </div>
            {/* <!-- Bento Pricing Card --> */}
            <div
              className="bg-surface-container-low rounded-2xl p-6 md:p-lg border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-6 md:gap-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 hidden sm:block">
                <span className="material-symbols-outlined text-[120px]">shopping_bag</span>
              </div>
              <div className="relative z-10 w-full md:w-auto text-center md:text-left">
                <p className="text-on-surface-variant font-body-sm text-body-sm mb-1">Standard Digital License
                </p>
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="font-display-lg text-3xl md:text-display-lg text-on-surface">${ebook.price}</span>
                  <span
                    className="text-on-surface-variant line-through font-body-lg text-lg md:text-body-lg">
                    ${(Number(ebook.price) + Math.floor(Math.random() * 91) + 10).toFixed(2)}
                  </span>
                </div>

              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto relative z-10">
                <BuyButton ebookId={ebook.id} price={ebook.price} />
                <button
                  className="bg-surface text-on-surface border border-outline-variant px-8 md:px-xl py-3 md:py-4 rounded-xl font-headline-sm text-lg md:text-headline-sm hover:bg-surface-container transition-all flex items-center justify-center gap-3 cursor-pointer">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Add to Library
                </button>
              </div>
            </div>
            <div className="prose max-w-none">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Detailed Description</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {ebook.description}
              </p>
            </div>
          </div>
        </div>
        {/* <!-- Related Ebooks Section --> */}
        <RelatedEbooks category={ebook.category || "General"} />
      </div>
    </main>
  );
}



// This runs on the SERVER — fast, SEO friendly, no loading spinner needed
export default async function EbookDetailPage({ params }: Props) {


  const { slug } = await params;

  return (
    // بمجرد أن ينتقل المستخدم، سيعرض Next.js الـ fallback فوراً
    // ويختفي إشعار "Rendering..." من الصفحة القديمة
    <Suspense fallback={<EbookDetailSkeleton />}>
      <EbookContent slug={slug} />
    </Suspense>
  );

}