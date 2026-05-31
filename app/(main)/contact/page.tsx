// app/contact/page.tsx
export default function ContactUsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 pt-32 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-on-surface">Get in Touch</h1>
        <p className="text-on-surface-variant">
          We'd love to hear from you. Please fill out the form below.
        </p>
      </div>

      {/* Form */}
      <form className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-on-surface">Full Name</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary" 
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-on-surface">Email Address</label>
          <input 
            type="email" 
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary" 
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-on-surface">Message</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary" 
            placeholder="How can we help you?"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-primary text-on-primary py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="text-center space-y-2 text-sm text-on-surface-variant">
        <p>Email: support@luminabooks.com</p>
        <p>Location: Cairo, Egypt</p>
      </div>
      
    </div>
  );
}