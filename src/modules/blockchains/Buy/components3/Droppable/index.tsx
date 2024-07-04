import React from 'react';
import { useDroppable } from '@dnd-kit/core';

import s from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLDivElement>;

const Droppable = ({ children, ...props }: Props) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable',
  });

  return (
    <div ref={setNodeRef} className={s.container} {...props}>
      {children}
    </div>
  );
};

export default Droppable;
