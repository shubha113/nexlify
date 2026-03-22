import { useState, useRef, useEffect } from 'react';
import '../styles/work.css';

const projects = [
  {
    id: 1,
    title: 'FinTrack AI',
    category: 'AI / ML',
    year: '2024',
    desc: 'An AI-powered personal finance dashboard that predicts spending patterns using ML models and gives smart budget recommendations.',
    tags: ['Python', 'React', 'TensorFlow', 'Node.js'],
    emoji: '💰',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    type: 'AI',
  },
  {
    id: 2,
    title: 'SwiftCart',
    category: 'Mobile App',
    year: '2024',
    desc: 'A Flutter-based e-commerce app with real-time inventory, AR product preview, and one-tap checkout.',
    tags: ['Flutter', 'Firebase', 'Dart', 'Stripe'],
    emoji: '🛒',
    bg: 'linear-gradient(135deg, #0f3460 0%, #533483 100%)',
    type: 'Mobile',
  },
  {
    id: 3,
    title: 'Clarifai Dashboard',
    category: 'Web App',
    year: '2024',
    desc: 'Real-time analytics platform for SaaS companies. Beautiful charts, custom reports, and team collaboration.',
    tags: ['Next.js', 'PostgreSQL', 'D3.js', 'AWS'],
    emoji: '📊',
    bg: 'linear-gradient(135deg, #ff4d1c 0%, #ff8c42 100%)',
    type: 'Web',
  },
  {
    id: 4,
    title: 'MediScan',
    category: 'AI / ML',
    year: '2023',
    desc: 'Medical imaging AI that assists radiologists with 94% accuracy on early-stage anomaly detection using deep learning.',
    tags: ['Python', 'PyTorch', 'React', 'Docker'],
    emoji: '🧬',
    bg: 'linear-gradient(135deg, #0a3d2b 0%, #1a6b4a 100%)',
    type: 'AI',
  },
  {
    id: 5,
    title: 'RideZen',
    category: 'Mobile App',
    year: '2023',
    desc: 'On-demand ride-sharing app for tier-2 cities. Real-time GPS tracking, driver ratings, and UPI payment integration.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Maps API'],
    emoji: '🚗',
    bg: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
    type: 'Mobile',
  },
  {
    id: 6,
    title: 'BuildFlow CMS',
    category: 'Web App',
    year: '2023',
    desc: 'Headless CMS for marketing teams with a drag-and-drop page builder, A/B testing, and SEO automation.',
    tags: ['Next.js', 'Prisma', 'Redis', 'Vercel'],
    emoji: '🏗️',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #ff4d1c 100%)',
    type: 'Web',
  },
];

const filters = ['All', 'Web', 'Mobile', 'AI'];

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

export default function Work() {
  const [active, setActive] = useState('All');
  const sectionRef = useRef(null);
  useInView(sectionRef);

  const filtered = active === 'All' ? projects : projects.filter(p => p.type === active);

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="container">
        <div className="work-header in-view-hidden">
          <div>
            <div className="section-tag">Our Portfolio</div>
            <h2 className="section-title">Work We're<br />Proud Of</h2>
          </div>
          <div className="work-filter">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn${active === f ? ' active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="work-grid">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="project-card in-view-hidden"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="project-visual" style={{ background: project.bg }}>
                <div className="project-visual-inner">{project.emoji}</div>
                <div className="project-overlay">
                  <button className="project-overlay-btn">View Details</button>
                  <button className="project-overlay-btn accent">Live Demo</button>
                </div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.desc}</div>
                <div className="project-tags">
                  {project.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="work-cta in-view-hidden">
          <p style={{ color: 'var(--ink-muted)', marginBottom: 20, fontSize: '1rem' }}>
            Want to see more? We have even more projects to share.
          </p>
          <button
            className="btn-outline"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
