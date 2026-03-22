import '../styles/contact.css';

const items = [
  'Web Development', 'Mobile Apps', 'AI & Machine Learning',
  'React & Next.js', 'Flutter', 'Node.js', 'UI/UX Design',
  'Cloud & DevOps', 'Python & AI', 'Full-Stack Engineering',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
