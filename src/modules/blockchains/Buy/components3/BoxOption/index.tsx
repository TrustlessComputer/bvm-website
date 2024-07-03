import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss';
import { useDraggable } from '@dnd-kit/core';
import { useFormOrderStore } from '@/modules/blockchains/Buy/stores';

type TBoxOption = PropsWithChildren & {
  active?: boolean;
  label: string;
  id: string;
};

const BoxOption = ({
  id,
  active,
  label,
  children,
}: TBoxOption): React.JSX.Element => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const { form } = useFormOrderStore((state) => state);
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div className={`${s.boxItem} ${active && s.activeBox}`}>
      <div className={s.boxItem_heading}>
        <div className={s.boxItem_heading_icon}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0046 1.50894C17.8027 1.50894 22.5047 6.21102 22.5047 12.0091C22.5047 17.8071 17.8027 22.5092 12.0046 22.5092C6.2066 22.5092 1.50452 17.8071 1.50452 12.0091C1.50452 6.21102 6.2066 1.50894 12.0046 1.50894ZM9.82415 15.4196L7.25347 12.8468C6.81551 12.4085 6.81542 11.6939 7.25347 11.2558C7.6916 10.8178 8.40939 10.8205 8.84433 11.2558L10.6567 13.0695L15.1651 8.56111C15.6032 8.12298 16.3179 8.12298 16.756 8.56111C17.1941 8.99916 17.1935 9.71446 16.756 10.152L11.4508 15.4571C11.0133 15.8946 10.298 15.8953 9.85993 15.4571C9.84762 15.4448 9.83575 15.4323 9.82415 15.4196Z"
              fill="#CECECE"
            />
          </svg>
        </div>
        <p className={s.boxItem_heading_text}>{label}</p>
      </div>

      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {children}
      </div>
    </div>
  );
};

export default BoxOption;
