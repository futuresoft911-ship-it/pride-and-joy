'use client';

import { useState, useCallback } from 'react';

/* ─── Helpers ─── */
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── Toast Component ─── */
function Toast({ message, type, onClose }) {
  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      {type === 'success' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
      {message}
    </div>
  );
}

/* ─── FAQ Data ─── */
const FAQ_DATA = [
  {
    question: 'What sizes do you offer?',
    answer:
      'We offer sizes from XS to 3XL across all of our designs. Our t-shirts are designed with an inclusive size range to ensure everyone can wear their pride comfortably. Check individual product pages for specific size charts and measurements.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day hassle-free return policy. If you\'re not completely satisfied with your purchase, you can return it for a full refund or exchange. Items must be unworn, unwashed, and in original packaging. Custom orders are final sale.',
  },
  {
    question: 'Do you offer custom designs?',
    answer:
      'Yes! We love creating custom designs. Whether it\'s for a Pride event, a group order, or a personal statement piece, our design team can work with you. Reach out via the contact form with "Custom Order" selected, and we\'ll get back to you within 24 hours.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 5-7 business days within the US. Express shipping (2-3 business days) is available at checkout. International shipping typically takes 10-15 business days. All orders over $50 qualify for free standard shipping!',
  },
];

/* ─── Subject Options ─── */
const SUBJECT_OPTIONS = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'custom', label: 'Custom Order' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
];

/* ─── Main Contact Page ─── */
export default function ContactPage() {
  /* Form state */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  /* FAQ state */
  const [openFAQ, setOpenFAQ] = useState(null);

  /* Show toast helper */
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  /* Validate form */
  const validate = useCallback(() => {
    const newErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject;
    const message = formData.message.trim();

    if (!name) newErrors.name = 'Full name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!subject) newErrors.subject = 'Please select a subject';
    if (!message) {
      newErrors.message = 'Message is required';
    } else if (message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  /* Handle input change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  /* Handle submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    /* Sanitize all inputs */
    const safe = {
      name: sanitize(formData.name.trim()),
      email: sanitize(formData.email.trim()),
      subject: sanitize(formData.subject),
      message: sanitize(formData.message.trim()),
    };

    /* Simulate API call */
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
  };

  /* Toggle FAQ */
  const toggleFAQ = (index) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  return (
    <main>
      <div className="container">
        {/* Hero */}
        <section className="page-hero">
          <h1>Get in Touch</h1>
          <p>
            Have a question, custom order request, or just want to say hi? We&apos;d love to hear
            from you.
          </p>
        </section>

        <hr className="rainbow-divider" />

        {/* Contact Grid */}
        <section className="contact-grid" aria-label="Contact form and information">
          {/* Form */}
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Full Name <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className="form-error" id="name-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Email <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="form-error" id="email-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">
                  Subject <span className="required" aria-hidden="true">*</span>
                </label>
                <select
                  id="contact-subject"
                  className={`form-select ${errors.subject ? 'error' : ''}`}
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <span className="form-error" id="subject-error" role="alert">
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Message <span className="required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  name="message"
                  placeholder="Tell us what's on your mind... (minimum 10 characters)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span className="form-error" id="message-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-rainbow"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="contact-sidebar" aria-label="Contact information">
            <div className="contact-sidebar-card">
              <h3>Other Ways to Reach Us</h3>

              <a href="mailto:support@prideandjoy.com" className="contact-method" aria-label="Email us at support@prideandjoy.com">
                <span className="contact-method-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4l-10 8L2 4" />
                  </svg>
                </span>
                <span>
                  <span className="contact-method-label">Email</span>
                  <span className="contact-method-value">support@prideandjoy.com</span>
                </span>
              </a>

              <a href="tel:+15551234567" className="contact-method" aria-label="Call us at (555) 123-4567">
                <span className="contact-method-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <span>
                  <span className="contact-method-label">Phone</span>
                  <span className="contact-method-value">(555) 123-4567</span>
                </span>
              </a>

              <a
                href="https://maps.google.com/?q=123+Pride+Plaza+San+Francisco+CA+94102"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
                aria-label="Visit us at 123 Pride Plaza, San Francisco, CA 94102"
              >
                <span className="contact-method-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>
                  <span className="contact-method-label">Address</span>
                  <span className="contact-method-value">123 Pride Plaza, San Francisco, CA 94102</span>
                </span>
              </a>

              <div className="contact-method" style={{ cursor: 'default' }}>
                <span className="contact-method-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <span>
                  <span className="contact-method-label">Business Hours</span>
                  <span className="contact-method-value">Mon–Fri 9am–6pm PST</span>
                </span>
              </div>
            </div>

            <div className="contact-sidebar-card">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a
                  href="https://instagram.com/prideandjoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/prideandjoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/prideandjoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Twitter"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </section>

        {/* FAQ Section */}
        <hr className="rainbow-divider" />

        <section className="faq-section" aria-label="Frequently Asked Questions">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list" role="list">
            {FAQ_DATA.map((item, index) => (
              <div key={index} className="faq-item" role="listitem">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <svg
                    className={`faq-chevron ${openFAQ === index ? 'open' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`faq-answer ${openFAQ === index ? 'open' : ''}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="faq-answer-inner">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </main>
  );
}
