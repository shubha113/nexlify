import { useState, useRef, useEffect } from 'react';
import '../styles/ai.css';

const GEMINI_API_KEY = 'AIzaSyB8Cu3futQ0bq6S26uMmgWJ40M5PACstZ8';

const SYSTEM_CONTEXT = `You are Nexlify's AI assistant — a smart, helpful, and friendly assistant for Nexlify, a digital studio of 3 expert builders.

About Nexlify:
- A tight-knit team of 3 engineers: Arjun (Full-Stack & AI), Rahul (Mobile & Backend), Priya (UI/UX & Frontend)
- Services: Web Application Development, Mobile App Development (Flutter/React Native), AI & Machine Learning, UI/UX Design, Cloud & DevOps
- Tech stack: React, Next.js, Node.js, Flutter, React Native, Python, TensorFlow, AWS, Firebase, PostgreSQL
- We do NOT do web design only (we build full products)
- No fixed pricing page — every project is custom quoted
- We ship production-grade, scalable products
- Average delivery: 4–12 weeks depending on scope
- We have shipped 30+ projects with 98% client satisfaction

Answer questions about our services, process, tech stack, team, timelines, and how to get started. Be concise, warm, and professional. If asked something outside our scope, gently redirect to what we do offer.`;

const initialMessages = [
  {
    role: 'ai',
    text: "Hey! 👋 I'm Nexlify's AI assistant, powered by Gemini. Ask me anything about our services, tech stack, timelines, or how to get started on your project!",
  },
];

const suggestions = [
  'What services do you offer?',
  'How long does a project take?',
  'Can you build a mobile app?',
  'What\'s your tech stack?',
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.in-view-hidden');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const conversationHistory = newMessages.map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
            contents: conversationHistory,
            generationConfig: { temperature: 0.75, maxOutputTokens: 400 },
          }),
        }
      );

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
        || "Hmm, I couldn't get a response right now. Try reaching out via our contact form!";

      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: "Looks like something went wrong on my end. Please reach out via the contact form below!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="ai-section" id="ai" ref={sectionRef}>
      <div className="ai-bg-glow" />
      <div className="ai-bg-grid" />

      <div className="container">
        <div className="ai-inner">
          <div className="ai-left in-view-hidden">
            <div className="section-tag">AI Powered</div>
            <h2 className="section-title">Ask Our<br />AI Assistant</h2>
            <p className="section-subtitle">
              Powered by Google Gemini, our AI assistant can answer your questions about our services, timelines, tech stack, and more — instantly.
            </p>

            <div className="ai-features">
              {[
                'Instantly answers your questions about our services',
                'Explains our tech stack and approach',
                'Guides you on project timelines & scope',
                'Available 24/7, responds in seconds',
              ].map(f => (
                <div key={f} className="ai-feature">
                  <div className="ai-feature-dot" />
                  {f}
                </div>
              ))}
            </div>

            {/* Quick suggestions */}
            <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    padding: '8px 14px',
                    borderRadius: '99px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    cursor: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'rgba(255,77,28,0.15)';
                    e.target.style.borderColor = 'rgba(255,77,28,0.4)';
                    e.target.style.color = 'rgba(255,255,255,0.9)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.target.style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="ai-chat-window in-view-hidden" style={{ transitionDelay: '0.15s' }}>
            <div className="ai-chat-header">
              <div className="ai-chat-avatar">🤖</div>
              <div>
                <div className="ai-chat-name">Nexlify AI</div>
                <div className="ai-chat-status">Online • Powered by Gemini</div>
              </div>
            </div>

            <div className="ai-chat-body" ref={bodyRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.role}`}>
                  <div className="chat-msg-avatar">
                    {msg.role === 'ai' ? '🤖' : 'You'}
                  </div>
                  <div className="chat-msg-bubble">{msg.text}</div>
                </div>
              ))}

              {loading && (
                <div className="chat-msg ai">
                  <div className="chat-msg-avatar">🤖</div>
                  <div className="chat-msg-bubble typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}
            </div>

            <div className="ai-chat-input-area">
              <textarea
                className="ai-chat-input"
                placeholder="Ask anything about Nexlify..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading}
              />
              <button
                className="ai-send-btn"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
