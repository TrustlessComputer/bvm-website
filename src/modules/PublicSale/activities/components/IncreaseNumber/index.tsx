import React, { useEffect, useMemo, useRef, useState } from 'react';

interface IProp {
  from?: number;
  to: number;
  timeSpan?: number; // seconds
  format?: (v: number) => string | number;
  minStep?: number;
}

const IncreaseNumber = React.memo((props: IProp) => {
  const {
    from = 0,
    to,
    timeSpan = 60, // seconds
    format,
    minStep = 1,
  } = props;

  const ref = useRef<HTMLSpanElement>(null);

  const isCounting = useRef(false);
  const [prev, setPrev] = useState(Number(from));
  const [next, setNext] = useState(Number(to));

  useEffect(() => {
    setNext((p) => Number(p > to ? p : to));

    return () => {
      setPrev((p) => Number(p > to ? p : to));
    };
  }, [to]);

  useEffect(() => {
    setPrev((p) => Number(p > from ? p : from));
  }, [from]);

  const formatValue = useMemo(() => {
    if (format) {
      return format;
    }
    return (_v: number) => _v;
  }, [format]);

  useEffect(() => {
    if (to) {
      if (from) {
        const digits = `${Number(from)}`
          .split('')
          .map((n) => (n === '.' ? '.' : Number(n)));

        const newDigits: any[] = [0];

        let timeout: ReturnType<typeof setTimeout>;
        const step = (): void => {
          try {
            const index = newDigits.length - 1;
            if (digits[index] === '.') {
              newDigits.push(0);
            } else if ((newDigits[index] || 0) < (digits[index] || 0)) {
              newDigits[index] = (newDigits[index] || 0) + 1;
            } else if (newDigits.length < digits.length) {
              if (digits[index + 1] === '.') {
                newDigits.push('.');
              } else {
                newDigits.push(0);
              }
            } else {
              isCounting.current = true;
            }

            if (ref.current) {
              const num = Number(
                digits
                  .map((digit, idx) => {
                    if (newDigits[idx]) {
                      return newDigits[idx];
                    }
                    if (digit === '.') {
                      return digit;
                    }
                    return 0;
                  })
                  .join(''),
              );
              // console.log(num);
              ref.current.innerHTML = `${formatValue(num)}`;
            }
          } catch (e) {
            isCounting.current = true;
          }

          if (isCounting.current) {
            if (timeout) {
              clearTimeout(timeout);
            }
          } else {
            timeout = setTimeout(() => {
              step();
            }, 100);
          }
        };

        step();
      } else {
        isCounting.current = true;
      }
    }
  }, [from, to]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const bigStep = (
      start: number,
      end: number,
      step: number,
      speed: number,
    ) => {
      if (step < minStep) {
        if (ref.current) {
          if (isCounting.current) {
            ref.current.innerHTML = `${formatValue(next)}`;
          }
          // ref.current.innerHTML = `${next}`;
        }
      } else if (start < next) {
        if (ref.current) {
          if (isCounting.current) {
            ref.current.innerHTML = `${formatValue(start)}`;
          }
          // ref.current.innerHTML = `${start}`;
        }
        timeout = setTimeout(() => {
          const fr = start + step;
          bigStep(fr, end, step, speed);
        }, speed * 1000);
      } else if (ref.current) {
        if (isCounting.current) {
          ref.current.innerHTML = `${formatValue(next)}`;
        }
        // ref.current.innerHTML = `${next}`;
      }
    };

    const remain = next - prev;
    const step = Math.floor(remain / 60);
    bigStep(prev, next, step, timeSpan / 60);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [prev, next, timeSpan, formatValue, minStep]);

  return <span ref={ref} />;
})

IncreaseNumber.displayName = "IncreaseNumber";

export default IncreaseNumber;
