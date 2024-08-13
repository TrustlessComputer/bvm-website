import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { zeroPad } from '@/utils/format';

// const FIVE_MINUTES_IN_SECS = 300;
const THIRTY_MINUTES_IN_SECS = 1800;

const useCountdown = (utcTime: string) => {
  const [asDays, setAsDays] = useState<number | null>(0);
  const [days, setDays] = useState<number | null>(0);
  const [hours, setHours] = useState<number | null>(0);
  const [minutes, setMinutes] = useState<number | null>(0);
  const [seconds, setSeconds] = useState<number | null>(0);
  const [ended, setEnded] = useState(false);
  const [countingEnded, setCountingEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!utcTime) {
      setEnded(true);
      setIsReady(true);
      return;
    }

    const interval = setInterval(() => {
      const now = dayjs().utc();
      const utcDayTime = dayjs.utc(utcTime);
      const diff = dayjs.duration(utcDayTime.diff(now));

      if (utcDayTime.unix() <= now.unix()) {
        clearInterval(interval);
        setAsDays(null);
        setDays(null);
        setHours(null);
        setMinutes(null);
        setSeconds(null);
        setEnded(true);
        setCountingEnded(true);
        setProgress(0);
        setIsReady(true);
        return;
      }
      setEnded(false);
      setAsDays(diff.asDays());
      setDays(diff.days());
      setHours(diff.hours());
      setMinutes(diff.minutes());
      setSeconds(diff.seconds());
      const current = diff.asSeconds();
      const progress = (current / THIRTY_MINUTES_IN_SECS) * 100;
      setProgress(100 - progress);
      setIsReady(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [utcTime]);

  return {
    asDays: Number(asDays),
    days,
    hours: hours !== null ? zeroPad(hours, 2) : null,
    minutes: minutes !== null ? zeroPad(minutes, 2) : null,
    seconds: seconds !== null ? zeroPad(seconds, 2) : null,
    ended,
    countingEnded,
    progress,
    isReady,
  };
};

export default useCountdown;
