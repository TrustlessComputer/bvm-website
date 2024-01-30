import React, { memo } from 'react';
// import QuestionIcon from '@/public/icons/icon-question.svg';
import s from './styles.module.scss';
import cs from 'clsx';
import { Tooltip } from '@chakra-ui/react';

interface HorizontalItemProps {
  label?: any;
  desc?: any;
  value?: any | React.ReactElement;
  color?: any;
  className?: string;
  onClick?: () => void;
}

const HorizontalItem: React.FC<HorizontalItemProps> = ({
  label,
  value,
  desc,
  color,
  className,
  onClick,
}) => {
  return (
    <div
      className={cs(s.container, className)}
      style={{ color: color }}
      onClick={onClick}
    >
      <div>
        {label}
        {desc && (
          <Tooltip label={desc}>
            <div>
              ?
            </div>
          </Tooltip>
        )}
      </div>

      <div>{value}</div>
    </div>
  );
};

export default memo(HorizontalItem);
