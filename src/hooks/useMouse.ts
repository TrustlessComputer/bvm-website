import { useEffect, useState } from 'react';

export default function useMouse(): { x: number; y: number } {
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent): void => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return mouse;
}
