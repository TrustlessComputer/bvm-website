import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';

export type DraggableProps = React.PropsWithChildren & {
  id: string;
  value?: string | number;
  useMask?: boolean;
  disabled?: boolean;
  index?: number;
  isDragging?: boolean;
  tooltip?: string;
};

const Draggable = ({
  id,
  useMask = false,
  children,
  value,
  disabled = false,
  isDragging = false,
                     tooltip,
}: DraggableProps) => {
  const refTooltip = useRef<HTMLAnchorElement>(null);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
    data: { value },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    // opacity: useMask && isDragging ? 0 : 1,
  };

  const onHover = () => {
    const wrapData = document.getElementById('wrapper-data');

    if (refTooltip.current && wrapData) {
      const rectData = wrapData.getBoundingClientRect();
      const rectTl = refTooltip.current.getBoundingClientRect();
      if (rectTl.right >= rectData.right) {
        refTooltip.current.classList.add(s.isRight);
      }

      if (rectTl.top <= rectData.top) {
        refTooltip.current.classList.add(s.isBottom);
      }
      refTooltip.current.classList.add(s.isHover);
    }
  };

  const onLeave = () => {
    if (refTooltip.current) {
      refTooltip.current.classList.remove(s.isHover);
      refTooltip.current.classList.remove(s.isRight);
      refTooltip.current.classList.remove(s.isHover);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={s.options}
      {...listeners}
      {...attributes}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onLeave}
    >
      {children}
      <span ref={refTooltip} className={`${s.tooltip}`}>{
        tooltip
      }</span>
    </div>
  );
};

export default Draggable;
