import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import useCountdown from '@/hooks/useCountdown';
import { Text } from '@chakra-ui/react';
import clsx from 'classnames';

interface IProps {
  expiredTime: string;
  hideIcon?: boolean;
  className?: string;
  onRefreshEnd?: () => void;
  showDay?: boolean;
}

const Countdown: React.FC<IProps> = ({
  expiredTime,
  hideIcon,
  className,
  onRefreshEnd,
  showDay = true
}: IProps): React.ReactElement => {
  const refCallEnd = useRef(false);
  const {
    days = 0,
    hours,
    minutes,
    seconds,
    ended,
  } = useCountdown(expiredTime);

  useEffect(() => {
    if (ended && expiredTime && onRefreshEnd && !refCallEnd.current) {
      refCallEnd.current = true;
      onRefreshEnd?.();
    }
  }, [ended, expiredTime, onRefreshEnd]);

  return (
    <div className={clsx(s.countdown, className)}>
      {!hideIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ fill: 'white' }}
        >
          <path
            d='M6 0.625C3.036 0.625 0.625 3.036 0.625 6C0.625 8.964 3.036 11.375 6 11.375C8.964 11.375 11.375 8.964 11.375 6C11.375 3.036 8.964 0.625 6 0.625ZM6 10.625C3.4495 10.625 1.375 8.5505 1.375 6C1.375 3.4495 3.4495 1.375 6 1.375C8.5505 1.375 10.625 3.4495 10.625 6C10.625 8.5505 8.5505 10.625 6 10.625ZM7.76501 7.23499C7.91151 7.38149 7.91151 7.619 7.76501 7.7655C7.69201 7.8385 7.596 7.87549 7.5 7.87549C7.404 7.87549 7.30799 7.839 7.23499 7.7655L5.73499 6.2655C5.66449 6.195 5.625 6.09949 5.625 6.00049V3.50049C5.625 3.29349 5.793 3.12549 6 3.12549C6.207 3.12549 6.375 3.29349 6.375 3.50049V5.84497L7.76501 7.23499Z'
            fill='white'
          />
        </svg>
      )}

      {ended && <Text className={s.text}>Ended</Text>}
      {!ended && (
        <Text className={s.text}>{`${showDay ? `${days}d : ` : ''}${hours}h : ${minutes}m : ${seconds}s`}</Text>
      )}
    </div>
  );
};

export default React.memo(Countdown);
