import { useEffect, useRef } from 'react';
import '../styles/hero.css';

export default function Hero() {
  const numRef = useRef([]);

  useEffect(() => {
    // Counter animation
    const targets = [{ el: 0, target: 30, suffix: '+' }, { el: 1, target: 98, suffix: '%' }, { el: 2, target: 3, suffix: 'yrs' }];
    targets.forEach(({ el, target, suffix }) => {
      const node = numRef.current[el];
      if (!node) return;
      let start = 0;
      const duration = 1800;
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.floor(eased * target);
        node.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      setTimeout(() => requestAnimationFrame(tick), 800);
    });
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content container">
        <div className="hero-left">
          <div className="hero-badge animate-fade-up">
            <div className="hero-badge-dot" />
            <span className="hero-badge-text">Available for new projects</span>
          </div>

          <h1 className="hero-heading">
            We Build<br />
            <em>Digital</em> Products<br />
            That Matter
          </h1>

          <p className="hero-desc">
            Nexlify is a tight-knit team of 3 builders crafting exceptional web apps, mobile experiences, and AI-powered solutions for ambitious founders and brands.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
              View Our Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Let's Talk
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num" ref={el => numRef.current[0] = el}>0+</span>
              <span className="hero-stat-label">Projects Shipped</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num" ref={el => numRef.current[1] = el}>0%</span>
              <span className="hero-stat-label">Client Satisfaction</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num" ref={el => numRef.current[2] = el}>0yrs</span>
              <span className="hero-stat-label">Combined Experience</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual">
            <div className="hero-float-card float-card-1">
              <div className="hero-float-card-icon" style={{ background: '#fff1ed' }}>🚀</div>
              <div className="hero-float-card-text">
                <span className="hero-float-card-title">Launch Ready</span>
                <span className="hero-float-card-sub">Production grade code</span>
              </div>
            </div>

            <div className="hero-card-main">
              <div className="hero-card-header">
                <div className="hero-card-dots">
                  <span /><span /><span />
                </div>
                <span className="hero-card-title">nexlify/app.tsx</span>
              </div>
              <div className="hero-code-block">
                <div><span className="code-comment">// Building the future, one line at a time</span></div>
                <div>&nbsp;</div>
                <div><span className="code-keyword">import</span> <span className="code-class">Nexlify</span> <span className="code-keyword">from</span> <span className="code-string">'./studio'</span></div>
                <div>&nbsp;</div>
                <div><span className="code-keyword">const</span> <span className="code-fn">createProduct</span> = <span className="code-keyword">async</span> (idea) {'=> {'}</div>
                <div>&nbsp; <span className="code-keyword">const</span> result = <span className="code-keyword">await</span> <span className="code-class">Nexlify</span>.build({'{'}</div>
                <div>&nbsp;&nbsp;&nbsp; design: <span className="code-string">"pixel-perfect"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp; code: <span className="code-string">"clean & scalable"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp; delivery: <span className="code-string">"on-time"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp; quality: <span className="code-accent">100</span></div>
                <div>&nbsp; {'}'});</div>
                <div>&nbsp;</div>
                <div>&nbsp; <span className="code-keyword">return</span> result.<span className="code-fn">ship</span>();</div>
                <div>{'}'}</div>
              </div>
            </div>

            <div className="hero-float-card float-card-2">
              <div className="hero-float-card-icon" style={{ background: '#f0fdf4' }}>✅</div>
              <div className="hero-float-card-text">
                <span className="hero-float-card-title">Project Delivered</span>
                <span className="hero-float-card-sub">On time, every time</span>
              </div>
            </div>

            <div className="hero-float-card float-card-3">
              <div className="hero-float-card-icon" style={{ background: '#eff6ff' }}>🤖</div>
              <div className="hero-float-card-text">
                <span className="hero-float-card-title">AI Powered</span>
                <span className="hero-float-card-sub">Gemini integrated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-label">Scroll</span>
      </div>
    </section>
  );
}
