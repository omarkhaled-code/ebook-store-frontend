
export default function FeaturesSection() {
    const features = [
        {
            icon: "⚡", // Feel free to replace these with your Material Symbols/Icons if you use them
            title: "Instant Secure Download",
            description: "No waiting for shipping. As soon as your payment is secured, your ebook download link appears instantly."
        },
        {
            icon: "📄", // Changed icon to a document/page icon for PDF transparency
            title: "Universal PDF Format",
            description: "All books are delivered in standard PDF format. Open, read, and keep them forever on any device without needing special reader apps."
        },
        {
            icon: "🔄",
            title: "Lifetime Free Updates",
            description: "Get free access to future editions or corrected prints of any ebook you purchase, straight from your account."
        }
    ];

    return (
        <section className="py-32 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Why Choose LuminaBooks?
                    </h2>
                    <p className="text-gray-600 mx-auto text-sm">
                        We provide a modern, smooth, and secure digital reading experience from checkout to your final page.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feat, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                        >
                            {/* Icon Wrapper */}
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 text-2xl rounded-2xl flex items-center justify-center mx-auto mb-5">
                                {feat.icon}
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {feat.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}