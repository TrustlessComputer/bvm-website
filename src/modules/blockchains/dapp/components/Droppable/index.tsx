import React from 'react';
import { useDroppable } from '@dnd-kit/core';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  value?: any;
};

const Droppable = ({ id, children, value, ...props }: Props) => {
  const { setNodeRef } = useDroppable({
    id,
    data: value,
  });

  return (
    <div
      id={id}
      ref={setNodeRef}
      style={{
        width: '100%',
        height: '100%',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default React.memo(Droppable);
