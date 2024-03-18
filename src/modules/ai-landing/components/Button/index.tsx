import React, {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import s from './styles.module.scss';
import { useGSAP } from '@gsap/react';
import { useStorePrimitive } from '@/modules/ai-landing/section/Primitives/useStorePrimitive';
import { useDebounce } from '@/hooks/useDebounce';
import gsap from 'gsap';

type IButton = {
  isWhite?: boolean;
  isDisabled?: boolean;
  className?: string;
  link?: string;
  onClick?: (e: React.MouseEvent | React.PointerEvent) => void;
  children: React.ReactNode;
  id?: number;
};

const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, className, isWhite, isDisabled, onClick, id = -2 }, ref) => {
    const bgRef = useRef<HTMLSpanElement>(null);
    const { contextSafe } = useGSAP();
    const contentRef = useRef<HTMLParagraphElement>(null);
    const { idPrimitive } = useStorePrimitive();
    const [prevId, setPrevId] = useState<number>(0);
    const debounceId = useDebounce(idPrimitive, 100);

    const handleActive = contextSafe(() => {
      const isDirection = prevId < idPrimitive;

      const direction = isDirection ? 'left' : 'right';
      gsap.to(bgRef.current, {
        // scaleX: 1,
        transform: 'scaleX(1)',
        ease: 'power3.out',
        duration: 0.6,
        overwrite: 'auto',
        transformOrigin: `center ${direction}`,
      });
      gsap.to(contentRef.current, {
        '--color': '#000',
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
    const handleLeave = contextSafe(() => {
      const isDirection = prevId > idPrimitive;

      const direction = isDirection ? 'left' : 'right';
      gsap.to(bgRef.current, {
        transform: 'scaleX(0)',
        ease: 'power3.out',
        duration: 0.6,
        overwrite: 'auto',
        transformOrigin: `center ${direction}`,
      });

      gsap.to(contentRef.current, {
        ease: 'power3.out',
        overwrite: 'auto',
        '--color': '#fff',
      });
    });

    useEffect(() => {
      setPrevId(debounceId);
      if (id === debounceId) {
        handleActive();
      } else {
        handleLeave();
      }
    }, [debounceId]);
    return (
      <button
        ref={ref}
        className={`${s.btn} ${className} ${isWhite ? s.white : ''} ${isDisabled ? s.isDisabled : ''}`}
        onClick={onClick}
      >
        <span ref={bgRef} className={s.btn_bg}></span>
        <p ref={contentRef} className={s.btn_content}>
          {children}
        </p>
      </button>
    );
  },
);

export default Button;
