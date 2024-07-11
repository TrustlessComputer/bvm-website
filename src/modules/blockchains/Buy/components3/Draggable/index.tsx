import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect } from 'react';
import s from './styles.module.scss';

export type DraggableProps = React.PropsWithChildren & {
  id: string;
  value?: string | number;
  useMask?: boolean;
  disabled?: boolean;
  index?: number;
  isDragging?: boolean;
};

const Draggable = ({
  id,
  useMask = false,
  children,
  value,
  disabled = false,
  isDragging = false,
}: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
    data: { value },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    // opacity: useMask && isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={s.options}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
