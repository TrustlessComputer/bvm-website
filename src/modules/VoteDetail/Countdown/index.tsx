import React, { useEffect, useRef } from 'react';
import useCountdown from '@/hooks/useCountdown';

interface IProps {
  expiredTime: string;
  onRefreshEnd?: () => void;
}

const Countdown: React.FC<IProps> = ({
  expiredTime,
  onRefreshEnd,
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
    <>
      {ended && <span>Ended</span>}
      {!ended && (
        <span>{`${
          hours !== '00' || (days !== null && days !== 0)
            ? `${
                days !== null && days !== 0 ? days * 24 + Number(hours) : hours
              }h : `
            : ''
        }${minutes}m : ${seconds}s`}</span>
      )}
    </>
  );
};

export default React.memo(Countdown);
