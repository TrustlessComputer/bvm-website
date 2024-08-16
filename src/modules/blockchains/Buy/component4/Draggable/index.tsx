import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React, { useRef } from 'react';
import cn from 'classnames';

import {
  blockDraggingSignal,
  idBlockErrorSignal,
} from '../../signals/useDragSignal';

import styles from './styles.module.scss';
import { useSignalEffect } from '@preact/signals-react';

type Props = {
  id: string;
  value?: any;
  disabled?: boolean;
  index?: number;
  isLabel?: boolean;
  tooltip?: string;
  right?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Draggable = ({
  id,
  children,
  value,
  disabled = false,
  tooltip,
  right = false,
  ...props
}: Props) => {
  const refTooltip = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = React.useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
      data: value,
    });

  if (isDragging && blockDraggingSignal.value.id !== id) {
    blockDraggingSignal.value = {
      ...value,
      id,
    };
  }

  useSignalEffect(() => {
    if (value?.fieldKey && idBlockErrorSignal.value === value.fieldKey) {
      setIsError(true);

      setTimeout(() => {
        idBlockErrorSignal.value = '';
        setIsError(false);
      }, 2000);
    }
  });

  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    cursor: disabled ? 'not-allowed' : 'grab',
    opacity: isDragging ? 0 : 1,
  };

  const onHover = () => {
    if (right) return;

    const wrapData = document.getElementById('left-droppable');

    if (refTooltip.current && wrapData) {
      const rectData = wrapData.getBoundingClientRect();
      const rectTl = refTooltip.current.getBoundingClientRect();
      if (rectTl.right >= rectData.right) {
        refTooltip.current.classList.add(styles.isRight);
      }

      if (rectTl.top <= rectData.top) {
        refTooltip.current.classList.add(styles.isBottom);
      }
      refTooltip.current.classList.add(styles.isHover);
    }
  };

  const onLeave = () => {
    if (refTooltip.current) {
      refTooltip.current.classList.remove(styles.isBottom);
      refTooltip.current.classList.remove(styles.isRight);
      refTooltip.current.classList.remove(styles.isHover);
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
      className={cn(styles.options, {
        [styles.shake]: isError,
      })}
      {...listeners}
      {...attributes}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onLeave}
    >
      {children}

      {tooltip && (
        <div ref={refTooltip} className={`${styles.tooltip}`}>
          {/* {tooltip} */}
        </div>
      )}
    </div>
  );
};

export default React.memo(Draggable);
