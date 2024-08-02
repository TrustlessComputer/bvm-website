import classNames from 'classnames';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';

import s from './styles.module.scss';
import { useGSAP } from '@gsap/react';
import { MathLerp, MathMap } from '@utils/mathUtils';
import { poFame } from '@/modules/landingV3/Componets/ScrollingSection/useScrollingSectionStore';

interface IProps {
  className?: string;
  urlFrame: string;
  totalFrames: number;
  willLoad?: number;
  height?: number;
  width?: number;
  from?: number;
  comp: React.RefObject<HTMLDivElement>;
}

interface IRefDomFrames {
  currentFrame: number;
  images: { image: HTMLImageElement; frame: number }[];
  lastFrame: number;
  progress: number;
  framesFirstLoad: number;
  currentUrlFrame?: string;

  ctx: CanvasRenderingContext2D | null;
  canvas?: HTMLCanvasElement;
  isLoaded: boolean;
  runFrame: null | (() => void);
}

export const Frames = ({
                         className = '',
                         urlFrame = '',
                         totalFrames = 0,
                         height = 1080,
                         width = 1920,
                         from = 0,
                         willLoad = 25,
                         comp,
                       }: IProps): ReactElement => {
  // @ts-ignore
  const refCanavs = useRef<HTMLCanvasElement>(null);
  const refDom = useRef<IRefDomFrames>({
    currentFrame: 0,
    images: [],
    lastFrame: from,
    progress: 0,
    framesFirstLoad: willLoad - 1,
    ctx: null,
    isLoaded: false,
    runFrame: null,
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const registerImgDom = (frame: number, step = false): void => {
      if (frame > totalFrames) return;
      for (let i = frame; i < frame + willLoad; i++) {
        if (i > totalFrames) return;
        if (refDom.current.currentUrlFrame && !refDom.current.images[i]) {
          refDom.current.images[i] = {
            image: document.createElement('img'),
            frame: i,
          };
          refDom.current.images[i].image.src = refDom.current.currentUrlFrame.replace(
            '%d',
            Math.floor(i).toString(),
          );
        }

        if (step) return;
      }
    };

    const drawFrame = (image: HTMLImageElement): void => {
      if (image.complete && image.naturalHeight !== 0) {
        refDom.current.ctx?.clearRect(
          0,
          0,
          refDom.current.canvas?.width || window.innerWidth,
          refDom.current.canvas?.height || window.innerHeight,
        );
        // @ts-ignore
        refDom.current.ctx?.drawImage(image, 0, 0, 1920, 1080);
      }
    };

    const loadFrame = async (frame: number, onLoaded?: () => void | null): Promise<void> => {
      if (!refDom.current.currentUrlFrame) {
        refDom.current.currentUrlFrame = urlFrame;
      }

      if (frame > totalFrames || refDom.current.images[frame]) return;
      registerImgDom(frame, true);
      // @ts-ignore
      refDom.current.images[frame].image.onload = (): void => {
        if (!onLoaded) {
          if (refDom.current.currentFrame === refDom.current.images[frame].frame) {
            drawFrame(refDom.current.images[frame].image);
          }
        } else {
          onLoaded && onLoaded();
        }
      };
    };

    const loadFirstFrame = (): void => {
      const checkLoaded: Record<string, number> = { value: (from - 1) };
      for (let i = from; i <= refDom.current.framesFirstLoad; i++) {
        loadFrame(i, (): void => {
          checkLoaded.value++;
          if (checkLoaded.value >= refDom.current.framesFirstLoad) {
            drawFrame(refDom.current.images[from].image);
            runCanvas();
          }
        });
      }
    };

    const runFrame = (): void => {
      const progress = refDom.current.progress || 0;

      const frameTmp: number = MathMap(progress, 0, 1, from, totalFrames);
      refDom.current.lastFrame = Math.floor(MathLerp(refDom.current.lastFrame, frameTmp, 0.1));
      const frame = Math.floor(frameTmp);//refDom.current.lastFrame;
      poFame.value = frame;

      if (frame !== refDom.current.currentFrame) {
        refDom.current.currentFrame = frame;
        if (!refDom.current.images[frame]) {
          loadFrame(frame);
        } else if (
          refDom.current.images[frame] &&
          refDom.current.currentFrame === refDom.current.images[frame].frame
        ) {
          registerImgDom(frame + refDom.current.framesFirstLoad);
          drawFrame(refDom.current.images[frame].image);
        }
      }
    };

    const runCanvas = async (): Promise<void> => {
      if (!comp.current || !refCanavs.current) return;

      const rect: DOMRect | undefined = comp.current?.getBoundingClientRect();
      refCanavs.current.width = width || rect?.width || window.innerWidth;
      refCanavs.current.height = height || rect?.height || window.innerHeight;
      refDom.current.ctx = refCanavs.current.getContext('2d');

      runFrame();
    };

    if (!refDom.current.isLoaded) {
      refDom.current.isLoaded = true;
      refDom.current.runFrame = runFrame;
      loadFirstFrame();
    }
    const taget = comp.current || document.getElementById('scrollingSection');
    const pin = document.getElementById('scrollingSection-inner');
    ScrollTrigger.create({
      trigger: pin,
      start: 'center center',
      pin: true,
      // markers: true,
      end: () => `${window.innerHeight * 3}px center`,
      onUpdate: (self: ScrollTrigger) => {
        // @ts-ignore
        refDom.current.progress = self.progress;
        refDom.current?.runFrame && refDom.current.runFrame();
      },
    });

    ScrollTrigger.refresh();

  }, { dependencies: [comp.current] });

  return (
    <div className={classNames(className, s.frames)}>
      <canvas ref={refCanavs} />
    </div>
  );
};
