import React from 'react';
import { HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import SvgInset from '@/components/SvgInset';

type Props = HTMLAttributes<HTMLDivElement> & {
  zIndex?: number;
  background?: string;
  disabled?: boolean;
};

const Lego = ({ zIndex, background, children, disabled, ...rest }: Props) => {
  const legoRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const parentDOM = legoRef.current?.parentElement;

    if (!parentDOM) return;

    const parentDOMIsDraggable =
      parentDOM.getAttribute('aria-roledescription') === 'draggable';

    if (parentDOMIsDraggable) {
      parentDOM.style.zIndex = `${zIndex}`;
    } else if (legoRef.current) {
      legoRef.current.style.zIndex = `${zIndex}`;
      legoRef.current.style.position = 'relative';
    }
  }, [legoRef.current, zIndex]);

  return (
    <div
      {...rest}
      ref={legoRef}
      className={cn(styles.lego, {
        [styles.lego__disabled]: disabled,
      })}
    >
      <div className={cn(styles.lego_piece, styles.lego_piece__top)}>
        <SvgInset svgUrl="/landingV3/svg/stud.svg" size={28} />
      </div>

      {children && <div className={styles.lego_content}>{children}</div>}

      <div className={cn(styles.lego_piece, styles.lego_piece__bottom)}>
        <SvgInset svgUrl="/landingV3/svg/stud.svg" size={28} />
      </div>
    </div>
  );
};

export default Lego;
