import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React, { useRef } from 'react';
import s from './styles.module.scss';

export type DraggableProps = {
  id: string;
  value?: string | number | null | Record<string, any>;
  useMask?: boolean;
  disabled?: boolean;
  index?: number;
  isLabel?: boolean;
  tooltip?: string;
  right?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Draggable = ({
  id,
  useMask = false,
  children,
  value,
  disabled = false,
  tooltip,
  isLabel,
  right = false,
  ...props
}: DraggableProps) => {
  const refTooltip = useRef<HTMLDivElement>(null);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
      data: { value },
    });

  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    opacity: useMask && isDragging ? 0 : 1,
  };

  const onHover = () => {
    if (right) return;

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
      refTooltip.current.classList.remove(s.isBottom);
      refTooltip.current.classList.remove(s.isRight);
      refTooltip.current.classList.remove(s.isHover);
    }
  };

  React.useEffect(() => {
    if (tooltip && refTooltip.current) {
      refTooltip.current.innerHTML = tooltip;
    }
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${s.options} ${isLabel && s.isLabel}`}
      {...listeners}
      {...attributes}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onLeave}
    >
      {children}
      {tooltip && (
        <div ref={refTooltip} className={`${s.tooltip}`}>
          {/* {tooltip} */}
        </div>
      )}
    </div>
  );
};

export default React.memo(Draggable);
