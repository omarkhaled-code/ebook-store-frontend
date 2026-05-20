import EbookCard from '@/components/ebook/EbookCard';
import Pagination from '@/components/ebook/Pagination';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const featuredBooks = [
    {
        title: 'Architectural Ethics',
        author: 'Elena Rodriguez',
        price: 34,
        imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=500&auto=format&fit=crop&q=60',
        isNew: true,
        category: 'Design'
    },
    {
        title: 'The AI Frontier',
        author: 'Marcus Thorne',
        price: 42,
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
        category: 'Data Science'
    },
    {
        title: 'Theory of Hue',
        author: 'Sarah Jenkins',
        price: 25,
        imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60',
        isBestSeller: true,
        category: 'Design'
    },
    {
        title: 'Ascent to Lead',
        author: 'David Wu',
        price: 39,
        imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60',
        category: 'Business'
    },
    {
        title: 'Full-Stack Patterns',
        author: 'Alex Mercer',
        price: 49,
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60',
        isBestSeller: true,
        category: 'Development'
    },
    {
        title: 'Product Launch Blueprint',
        author: 'Sophia Chen',
        price: 29,
        imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=500&auto=format&fit=crop&q=60',
        isNew: true,
        category: 'Product'
    },
    {
        title: 'Data-Driven Growth',
        author: 'Michael Bradley',
        price: 45,
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60',
        category: 'Data Science'
    },

    {
        title: 'The Solopreneur Guide',
        author: 'Liam O\'Connor',
        price: 19,
        imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60',
        category: 'Business'
    },
    {
        title: 'Microservices Architecture',
        author: 'Devon Sanders',
        price: 55,
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60',
        isBestSeller: true,
        category: 'Development'
    },
    {
        title: 'Ship Fast, Lean Product',
        author: 'Taylor Vance',
        price: 37,
        imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=500&auto=format&fit=crop&q=60',
        isNew: true,
        category: 'Product'
    },
    {
        title: 'Architectural Ethics',
        author: 'Elena Rodriguez',
        price: 34,
        imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=500&auto=format&fit=crop&q=60',
        isNew: true,
        category: 'Design'
    },
    {
        title: 'The AI Frontier',
        author: 'Marcus Thorne',
        price: 42,
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
        category: 'Data Science'
    },
];
export default async function page() {

    await delay(1000);
    return (
        <div className='relative pt-32 pb-xl overflow-hidden'>
            <section className="mb-lg container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-md">
                    <div>
                        <h1 className="font-display-lg text-display-lg text-on-surface mb-xs">Explore Our Library</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Curated professional guides
                            and technical deep-dives to accelerate your career in tech and business.</p>
                    </div>
                    <div className="flex items-center gap-sm">
                        <button
                            className="flex items-center gap-xs font-body-sm text-body-sm border border-outline-variant px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors">
                            <span className="material-symbols-outlined">filter_list</span>
                            <span className="">Filters</span>
                        </button>
                        <div className="relative">
                            <select
                                className="appearance-none font-body-sm text-body-sm border border-outline-variant px-4 py-2 pr-10 rounded-lg bg-surface hover:bg-surface-container-low transition-colors outline-none cursor-pointer">
                                <option>Sort by: Popularity</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest First</option>
                            </select>
                            <span
                                className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                        </div>
                    </div>
                </div>
                {/* */}
                <div className="flex flex-wrap gap-sm">
                    <button
                        className="px-5 py-2 rounded-full bg-primary text-on-primary font-body-sm text-body-sm font-semibold transition-all">All
                        Categories</button>
                    <button
                        className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all">Development</button>
                    <button
                        className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all">Design</button>
                    <button
                        className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all">Business</button>
                    <button
                        className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all">Data
                        Science</button>
                    <button
                        className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all">Product</button>
                </div>
            </section>

            <section className="container mx-auto px-4 lg:px-8 pt-12">
                {/* تم زيادة عدد الأسطر تلقائياً بفضل الـ Grid حيث سيعرض 4 كتب في كل سطر على الشاشات الكبيرة */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-md">
                    {featuredBooks.map((book, index) => (
                        <EbookCard
                            key={index}
                            title={book.title}
                            author={book.author}
                            price={book.price}
                            imageUrl={book.imageUrl}
                            isNew={book.isNew}
                            isBestSeller={book.isBestSeller}
                        />
                    ))}
                </div>
                <Pagination current_page={1} last_page={5} />
            </section>
        </div>
    );
}