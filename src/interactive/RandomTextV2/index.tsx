import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

const RandomTextV2 = forwardRef(
  (props: PropsWithChildren, ref): React.ReactElement => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
    const refInterval = useRef<NodeJS.Timeout>();
    const refClear = useRef<NodeJS.Timeout>();
    const refIteration = useRef<number>(0);
    const refText = useRef<HTMLDivElement>(null);
    const refOriginText = useRef<string>('');

    useImperativeHandle(ref, () => ({
      onHover,
    }));

    const onHover = () => {
      refClear.current && clearTimeout(refClear.current);
      refInterval.current && clearInterval(refInterval.current);
      refIteration.current = 0;

      refInterval.current = setInterval(() => {
        if (!refText.current) return;

        refText.current.innerText = refText.current.innerText
          .split('')
          .map((letter, index) => {
            if (index < refIteration.current) {
              return refOriginText.current[index];
            }

            return letter === ' '
              ? letter
              : letters[Math.floor(Math.random() * letters.length)];
          })
          .join('');

        if (refIteration.current >= refOriginText.current.length) {
          clearInterval(refIteration.current);
        }

        refIteration.current += 1 / 3;
      }, 30);
    };

    useEffect(() => {
      if (refText.current) refOriginText.current = refText.current.innerText;
    }, []);

    return (
      <div ref={refText} onMouseEnter={onHover} {...props}>
        {props.children}
      </div>
    );
  }
);

export default RandomTextV2;
