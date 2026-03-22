import { useState, useRef, useEffect } from 'react';

function useInView(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll('.in-view-hidden');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);
  useInView(sectionRef);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending (no backend)
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-inner">
          <div className="contact-left in-view-hidden">
            <div>
              <div className="section-tag">Get In Touch</div>
              <h2 className="section-title">Let's Build<br />Something Great</h2>
              <p className="section-subtitle" style={{ marginTop: 16 }}>
                Have an idea? We'd love to hear it. Tell us about your project and we'll get back within 24 hours.
              </p>
            </div>

            <div className="contact-availability">
              <div className="contact-availability-dot" />
              Currently available for new projects — slots filling fast!
            </div>

            <div className="contact-info-cards">
              {[
                { icon: '📧', title: 'Email Us', val: 'hello@nexlify.dev' },
                { icon: '💬', title: 'WhatsApp', val: '+91 98765 43210' },
                { icon: '📍', title: 'Based In', val: 'India • Working Globally' },
              ].map(info => (
                <div key={info.title} className="contact-info-card">
                  <div className="contact-info-icon">{info.icon}</div>
                  <div>
                    <div className="contact-info-title">{info.title}</div>
                    <div className="contact-info-val">{info.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="in-view-hidden" style={{ transitionDelay: '0.15s' }}>
            {sent ? (
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                  padding: 40,
                }}
              >
                <div className="form-success">
                  <div className="form-success-icon">🎉</div>
                  <div className="form-success-title">Message Sent!</div>
                  <div className="form-success-text">
                    Thanks for reaching out. We'll get back to you within 24 hours. Excited to hear about your project!
                  </div>
                  <button
                    className="btn-outline"
                    style={{ marginTop: 16 }}
                    onClick={() => { setSent(false); setForm({ name: '', email: '', service: '', budget: '', message: '' }); }}
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                  padding: 36,
                }}
              >
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--ink)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                    Start a Project
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--ink-muted)' }}>
                    Fill out the form and we'll reach out within 24 hours.
                  </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        className="form-input"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        className="form-input"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Service Needed</label>
                      <select
                        className="form-select"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service</option>
                        <option value="web">Web Application</option>
                        <option value="mobile">Mobile App</option>
                        <option value="ai">AI / ML Solution</option>
                        <option value="design">UI/UX Design</option>
                        <option value="cloud">Cloud & DevOps</option>
                        <option value="other">Something Else</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Budget Range</label>
                      <select
                        className="form-select"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select budget</option>
                        <option value="5-15k">₹5L – ₹15L</option>
                        <option value="15-30k">₹15L – ₹30L</option>
                        <option value="30-50k">₹30L – ₹50L</option>
                        <option value="50k+">₹50L+</option>
                        <option value="discuss">Let's Discuss</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tell Us About Your Project *</label>
                    <textarea
                      className="form-textarea"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your idea, goals, and any specific requirements..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="form-submit"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'rotateSlow 1s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
