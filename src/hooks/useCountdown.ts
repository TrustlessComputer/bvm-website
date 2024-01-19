import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { zeroPad } from '@/utils/format';

dayjs.extend(utc);
dayjs.extend(duration);

// const FIVE_MINUTES_IN_SECS = 300;
const THIRTY_MINUTES_IN_SECS = 1800;

const useCountdown = (utcTime: string) => {
  const [days, setDays] = useState<number | null>(0);
  const [hours, setHours] = useState<number | null>(0);
  const [minutes, setMinutes] = useState<number | null>(0);
  const [seconds, setSeconds] = useState<number | null>(0);
  const [ended, setEnded] = useState(false);
  const [countingEnded, setCountingEnded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!utcTime) {
      setEnded(true);
      return;
    }

    const interval = setInterval(() => {
      const now = dayjs().utc();
      const diff = dayjs.duration(dayjs.utc(utcTime).diff(now));
      if (diff.milliseconds() <= 0) {
        clearInterval(interval);
        setDays(null);
        setHours(null);
        setMinutes(null);
        setSeconds(null);
        setEnded(true);
        setCountingEnded(true);
        setProgress(0);
        return;
      }
      setEnded(false);
      setDays(diff.days());
      setHours(diff.hours());
      setMinutes(diff.minutes());
      setSeconds(diff.seconds());
      const current = diff.asSeconds();
      const progress = (current / THIRTY_MINUTES_IN_SECS) * 100;
      setProgress(100 - progress);
    }, 1000);

    return () => clearInterval(interval);
  }, [utcTime]);

  return {
    days,
    hours: hours !== null ? zeroPad(hours, 2) : null,
    minutes: minutes !== null ? zeroPad(minutes, 2) : null,
    seconds: seconds !== null ? zeroPad(seconds, 2) : null,
    ended,
    countingEnded,
    progress,
  };
};

export default useCountdown;
