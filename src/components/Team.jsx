import { useRef, useEffect } from 'react';
import '../styles/team.css';

const members = [
  {
    name: 'Arjun Sharma',
    role: 'Full-Stack & AI Lead',
    bio: 'Arjun architects scalable web platforms and loves blending backend systems with machine learning. 3+ years turning complex problems into elegant APIs.',
    skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AI/ML'],
    emoji: 'AS',
    bg: 'linear-gradient(135deg, #1a1a2e, #ff4d1c)',
    github: '#',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Rahul Verma',
    role: 'Mobile & Backend Engineer',
    bio: 'Rahul ships beautiful cross-platform mobile apps with Flutter and React Native. Obsessed with performance, animations, and sub-second load times.',
    skills: ['Flutter', 'React Native', 'Firebase', 'AWS', 'Dart'],
    emoji: 'RV',
    bg: 'linear-gradient(135deg, #0f3460, #533483)',
    github: '#',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Priya Kapoor',
    role: 'UI/UX & Frontend Engineer',
    bio: 'Priya bridges design and code. She crafts pixel-perfect interfaces backed by user research. If it looks good and feels good, Priya built it.',
    skills: ['Figma', 'React', 'Next.js', 'CSS3', 'Design Systems'],
    emoji: 'PK',
    bg: 'linear-gradient(135deg, #2d1b69, #11998e)',
    github: '#',
    linkedin: '#',
    twitter: '#',
  },
];

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We dig deep into your goals, users, and market to fully understand the problem we\'re solving.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Wireframes, prototypes, and design systems built with your brand and users in mind.',
  },
  {
    num: '03',
    title: 'Develop',
    desc: 'Clean, scalable code with weekly demos and full transparency throughout the build.',
  },
  {
    num: '04',
    title: 'Deploy',
    desc: 'Launch, test, iterate. We stay on board post-launch to make sure everything runs smooth.',
  },
];

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

export default function Team() {
  const sectionRef = useRef(null);
  useInView(sectionRef);

  return (
    <section className="team" id="team" ref={sectionRef}>
      <div className="container">
        <div className="team-header in-view-hidden">
          <div className="section-tag">The People</div>
          <h2 className="section-title">Three Builders,<br />One Vision</h2>
          <p className="section-subtitle">
            Small team, zero fluff. Every project gets the full attention of all three of us — no hand-offs to juniors.
          </p>
        </div>

        <div className="team-grid">
          {members.map((member, i) => (
            <div
              key={member.name}
              className="team-card in-view-hidden"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="team-card-top" style={{ background: member.bg }}>
                <div className="team-ring team-ring-3" />
                <div className="team-ring team-ring-2" />
                <div className="team-ring team-ring-1" />
                <div className="team-avatar">{member.emoji}</div>
              </div>

              <div className="team-card-body">
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
                <div className="team-bio">{member.bio}</div>
                <div className="team-skills">
                  {member.skills.map(s => (
                    <span key={s} className="team-skill">{s}</span>
                  ))}
                </div>
                <div className="team-socials">
                  <a href={member.github} className="team-social-link" aria-label="GitHub">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={member.linkedin} className="team-social-link" aria-label="LinkedIn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href={member.twitter} className="team-social-link" aria-label="Twitter">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="process">
          <div className="process-header in-view-hidden">
            <div className="section-tag">How We Work</div>
            <h2 className="section-title">Our Process</h2>
          </div>

          <div className="process-steps">
            {steps.map((step, i) => (
              <div key={step.num} className="process-step in-view-hidden" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="process-step-num">{step.num}</div>
                <div className="process-step-title">{step.title}</div>
                <div className="process-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
