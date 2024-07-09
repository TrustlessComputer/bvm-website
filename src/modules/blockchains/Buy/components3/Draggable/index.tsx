import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect } from 'react';
import s from './styles.module.scss';

export type DraggableProps = React.PropsWithChildren & {
  id: string;
  value?: string | number;
  disabled?: boolean;
  index?: number;
};

const Draggable = ({
  id,
  children,
  value,
  disabled = false,
  index,
}: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
      data: { value },
    });
  const yOffset = isDragging ? index! * 100 : 0;

  console.log('transform', transform);
  const style = {
    transform: CSS.Translate.toString(transform),
    // position: isDragging ? 'fixed' : 'relative',
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
