import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import s from './styles.module.scss';

export type DraggableProps = React.PropsWithChildren & {
  id: string;
  value?: string | number;
  disabled?: boolean;
};

const Draggable = ({
  id,
  children,
  value,
  disabled = false,
}: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
    data: { value },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
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
