import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Team from './components/Team';
import Marquee from './components/Marquee';
import AIAssistant from './components/AIAssistant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/contact.css';

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Team />
        <Marquee />
        <AIAssistant />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
