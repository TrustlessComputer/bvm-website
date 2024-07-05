import React from 'react';
import { useDroppable } from '@dnd-kit/core';

import s from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
};

const Droppable = ({ id, children, ...props }: Props) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable' + '-' + id,
  });

  return (
    <div ref={setNodeRef} {...props}>
      {children}
    </div>
  );
};

export default React.memo(Droppable);
