export default function EmptyEbooks() {
  return (
    <main className="min-h-[70vh] pt-32 pb-xl px-gutter flex flex-col items-center justify-center w-full">
      <div className="max-w-2xl w-full text-center">
        
        {/* حاوية الرسم التوضيحي (Illustration Container) */}
        <div className="relative mb-lg group">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700"></div>
          
          <div className="relative bg-surface-container-lowest rounded-3xl p-xl border border-outline-variant overflow-hidden shadow-sm">
            {/* تم تغيير الرابط هنا ليصبح رابطاً حقيقياً يعمل وبجودة عالية */}
            <img 
              alt="No ebooks found illustration" 
              className="w-full h-64 object-contain rounded-xl"
              src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=80" 
            />
          </div>
        </div>

        {/* النصوص والوصف (Text Content) */}
        <div className="space-y-sm">
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
            No ebooks found
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant  mx-auto">
            We couldn't find any titles matching your current selection. Try adjusting your filters or searching for a broader term.
          </p>
        </div>

        {/* أزرار اتخاذ الإجراء (Call to Actions) */}
        <div className="mt-xl flex flex-col sm:flex-row items-center justify-center gap-md">
          <button className="w-full sm:w-auto px-lg py-md bg-primary text-on-primary font-semibold rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 duration-200 cursor-pointer">
            Clear All Filters
          </button>
        </div>
       
      </div>
    </main>
  );
}