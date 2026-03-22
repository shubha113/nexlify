import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    const animateRing = () => {
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.12;
      ringPos.current.y += dy * 0.12;
      ring.style.left = ringPos.current.x + 'px';
      ring.style.top = ringPos.current.y + 'px';
      raf.current = requestAnimationFrame(animateRing);
    };

    const onMouseDown = () => dot.classList.add('cursor-click');
    const onMouseUp = () => dot.classList.remove('cursor-click');

    const onHoverEnter = () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    };
    const onHoverLeave = () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    };

    const addHoverListeners = () => {
      const hoverEls = document.querySelectorAll('a, button, [data-cursor-hover]');
      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', onHoverEnter);
        el.addEventListener('mouseleave', onHoverLeave);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    raf.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
