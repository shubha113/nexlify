import { useEffect, useRef } from 'react';
import '../styles/services.css';

const services = [
  {
    icon: '⚡',
    title: 'Web Application Development',
    desc: 'We engineer fast, scalable, and beautiful web applications using React, Next.js, and modern tooling. From MVPs to enterprise-grade platforms.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    num: '01',
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile apps with Flutter and React Native that feel native on every device. iOS & Android with a single codebase.',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
    num: '02',
  },
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'Integrate intelligent automation, NLP, computer vision, and custom ML models into your product. We speak AI natively.',
    tags: ['Python', 'TensorFlow', 'OpenAI', 'Gemini'],
    num: '03',
    wide: false,
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Research-driven design that users love. Wireframes, prototypes, design systems, and pixel-perfect handoffs.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Research'],
    num: '04',
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    desc: 'We set up and manage your cloud infrastructure on AWS, GCP, or Azure. CI/CD pipelines, Docker, Kubernetes, and everything in between.',
    tags: ['AWS', 'Docker', 'CI/CD', 'Kubernetes'],
    num: '05',
    wide: true,
  },
];

function useInView(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.15 }
    );
    const els = ref.current?.querySelectorAll('.in-view-hidden');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export default function Services() {
  const sectionRef = useRef(null);
  useInView(sectionRef);

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="container">
        <div className="services-header in-view-hidden">
          <div className="section-tag">What We Do</div>
          <h2 className="section-title">Services That Drive<br />Real Results</h2>
          <p className="section-subtitle">
            From idea to deployment, we handle the full spectrum of digital product development with craftsmanship and care.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.num}
              className={`service-card in-view-hidden${service.wide ? ' wide' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {service.wide ? (
                <>
                  <div className="service-card-body">
                    <div className="service-card-icon">{service.icon}</div>
                    <span className="service-card-num">{service.num}</span>
                    <div className="service-card-title">{service.title}</div>
                    <div className="service-card-desc">{service.desc}</div>
                    <div className="service-card-tags">
                      {service.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
                    </div>
                  </div>
                  <div className="service-card-visual">☁️</div>
                </>
              ) : (
                <>
                  <div className="service-card-icon">{service.icon}</div>
                  <span className="service-card-num">{service.num}</span>
                  <div className="service-card-title">{service.title}</div>
                  <div className="service-card-desc">{service.desc}</div>
                  <div className="service-card-tags">
                    {service.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
                  </div>
                  <div className="service-card-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 13L13 1M13 1H3M13 1v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
