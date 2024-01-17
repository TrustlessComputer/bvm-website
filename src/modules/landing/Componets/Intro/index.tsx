import s from './styles.module.scss';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useAnimationStore from '@/stores/useAnimationStore';
import { MathMap } from '@/utils/mathUtils';
import { DotLottiePlayer } from '@dotlottie/react-player';

const FRAMES = 169;

export default function Intro() {
  const refBtn = useRef<HTMLButtonElement>(null);
  const refWrap = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refThumb = useRef<HTMLDivElement>(null);
  const refActions = useRef({ isDown: false, isComplete: false, current: 0, xFrame: 0 });
  const quickTo = useRef<gsap.QuickToFunc>();
  const quickFillter = useRef<gsap.QuickToFunc>();
  const { setPlay, setPlayed, played } = useAnimationStore();
  const lottieRef = useRef<any>();
  const refFlare = useRef<HTMLDivElement>(null);
  const refSky = useRef<HTMLDivElement>(null);


  useEffect(() => {
    played && completed();
  }, [played]);

  useEffect(() => {
    if (typeof document !== undefined) {
      document.body.style.overflow = 'hidden';
    }
    quickTo.current = gsap.quickTo(refBtn.current, 'x', {
      duration: 0.2,
    });

    quickFillter.current = gsap.quickTo(refThumb.current, '--clipPath', {
      duration: 0.2,
    });
  }, []);
  const completed = () => {

    gsap.fromTo(
      refContent.current,
      { pointerEvents: 'none' },
      {
        opacity: 0,
        scale: 1.2,
        delay: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          document.body.style.overflow = 'auto';
          setPlayed();
          if (refContent.current) refContent.current.style.display = 'none';
        },
      },
    );
    setTimeout(setPlay, 300);
  };

  const playCompleted = () => {
    refActions.current.isComplete = true;
    const tm = { value: refActions.current.xFrame };
    gsap.to(tm, {
      value: FRAMES, ease: 'power3.inOut', duration: .4, onUpdate: () => {
        lottieRef.current?.seek(tm.value);
      },
      onComplete: completed,
    });
    gsap.to(refFlare.current, { '--bg': 1, '--shadown': '500px', ease: 'power3.inOut', duration: .6 });
    gsap.to(refSky.current, { '--bg': 1, duration: 1.2, ease: 'power3.inOut' });
  };

  const onMouseUp = () => {
    if (refActions.current.isComplete || !refBtn.current || !refWrap.current)
      return;
    refActions.current.isDown = false;
    const rectBtn = refBtn.current.getBoundingClientRect();
    const rectWrap = refWrap.current.getBoundingClientRect();

    if (refActions.current.current > rectWrap.width / 2) {
      const dis = rectWrap.width - rectBtn.width;
      refActions.current.current = 0;
      quickTo.current && quickTo.current(dis);
      // lottieRef.current?.seek(FRAMES);
      playCompleted();
    } else {
      refActions.current.current = 0;
      quickTo.current && quickTo.current(0);
      lottieRef.current?.seek(0);
      gsap.to(gradientRef.current, {
        opacity: 1,
        ease: 'power3.out',
        duration: 0.6,
      });
    }
  };

  const onMouseDown = () => {
    if (refActions.current.isComplete) return;
    refActions.current.isDown = true;
    gsap.to(gradientRef.current, {
      opacity: 0,
      ease: 'power3.out',
      duration: 0.6,
    });
  };

  const onMouse = (e: any) => {
    if (!refActions.current.isDown || refActions.current.isComplete) return;
    if (!refBtn.current || !refWrap.current) return;

    const rectBtn = refBtn.current.getBoundingClientRect();
    const rectWrap = refWrap.current.getBoundingClientRect();

    const xx = (e?.touches?.length && e?.touches[0]) ? e?.touches[0]?.clientX : e.clientX;
    refActions.current.current = (xx) - rectWrap.left - rectBtn.width / 2;
    refActions.current.current = Math.max(
      Math.min(refActions.current.current, rectWrap.width - rectBtn.width),
      0,
    );

    const x = MathMap(
      refActions.current.current,
      0,
      rectWrap.width - rectBtn.width,
      0,
      FRAMES,
    );
    lottieRef.current?.seek(x);
    quickTo.current && quickTo.current(refActions.current.current);
    refActions.current.xFrame = x;

    if (refActions.current.current > rectWrap.width / 2) {
      const dis = rectWrap.width - rectBtn.width;
      refActions.current.current = 0;
      quickTo.current && quickTo.current(dis);
      playCompleted();
    }
  };

  return (
    <div ref={refContent} className={s.intro}>
      {!played && (
        <div className={s.intro_inner}>
          <div className={s.intro_supper_content}>
            <h1 className={s.intro_supper_content_bitcoin}>Welcome to <b>the future of Bitcoin.</b></h1>
            <p className={s.intro_supper_content_desc}>
              BVM is the first <b>modular Bitcoin L2 metaprotocol</b> on Bitcoin. With a few clicks, anyone can plug and
              play
              the best-of-breed blockchain modules to launch their own Bitcoin L2 blockchain.
            </p>
          </div>

          <div className={s.intro_inner_thumbnail} ref={refThumb}>
            <div className={s.intro_inner_thumbnail_inner}>
              <div className={s.grid}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='567'
                  height='194'
                  viewBox='0 0 567 194'
                  fill='none'
                >
                  <path
                    opacity='0.7'
                    d='M422.032 0.234244L421.91 0.0678711H145.524L0.422485 193.933H567L422.032 0.234244ZM444.487 31.6245H413.239L403.545 15.4302H432.37L444.487 31.6245ZM213.334 52.6659H247.883L244.359 76.2141H206.286L213.334 52.6659ZM205.419 76.2141H167.379L177.95 52.6659H212.467L205.419 76.2141ZM361.148 76.2141H323.074L319.55 52.6659H354.1L361.148 76.2141ZM391.706 57.6129L389.483 52.6659L400.055 76.2141L391.706 57.6129ZM284.134 52.6659H318.705L322.229 76.2141H284.134V52.6659ZM283.3 76.2141H245.204L248.728 52.6659H283.3V76.2141ZM319.417 51.834L316.516 32.4564H348.041L353.844 51.834H319.417ZM318.572 51.834H284.123V32.4564H315.671L318.572 51.834ZM283.289 51.834H248.85L251.752 32.4564H283.3V51.834H283.289ZM248.006 51.834H213.578L219.381 32.4564H250.907L248.006 51.834ZM244.237 77.046L239.868 106.207H197.304L206.03 77.046H244.226H244.237ZM245.082 77.046H283.3V106.207H240.713L245.082 77.046ZM284.134 77.046H322.352L326.72 106.207H284.134V77.046ZM323.196 77.046H361.392L370.119 106.207H327.554L323.185 77.046H323.196ZM362.27 77.046H400.433L413.528 106.207H370.997L362.27 77.046ZM401.344 77.046H439.462L456.926 106.207H414.45L401.355 77.046H401.344ZM400.966 76.2141L390.395 52.6659H424.855L438.951 76.2141H400.966ZM390.017 51.834L381.313 32.4564H412.75L424.355 51.834H390.017ZM389.105 51.834H354.711L348.909 32.4564H380.401L389.105 51.834ZM348.664 31.6245L343.817 15.4302H372.764L380.034 31.6245H348.664ZM347.797 31.6245H316.393L313.97 15.4302H342.95L347.797 31.6245ZM315.548 31.6245H284.134V15.4302H313.125L315.548 31.6245ZM283.3 31.6245H251.885L254.309 15.4302H283.3V31.6245ZM251.04 31.6245H219.637L224.483 15.4302H253.464L251.04 31.6245ZM218.77 31.6245H187.399L194.669 15.4302H223.616L218.77 31.6245ZM218.525 32.4564L212.722 51.834H178.328L187.032 32.4564H218.525ZM177.417 51.834H143.078L154.684 32.4564H186.121L177.417 51.834ZM177.039 52.6659L166.467 76.2141H128.483L142.578 52.6659H177.039ZM166.089 77.046L152.994 106.207H110.519L127.982 77.046H166.1H166.089ZM167.001 77.046H205.163L196.437 106.207H153.906L167.001 77.046ZM197.048 107.039H239.735L234.199 144.008H185.976L197.048 107.039ZM240.58 107.039H283.289V144.008H235.044L240.58 107.039ZM284.123 107.039H326.832L332.367 144.008H284.123V107.039ZM327.676 107.039H370.363L381.435 144.008H333.212L327.676 107.039ZM371.23 107.039H413.884L430.48 144.008H382.291L371.219 107.039H371.23ZM414.795 107.039H457.393L479.526 144.008H431.392L414.795 107.039ZM458.371 107.039H500.913L528.582 144.008H480.504L458.371 107.039ZM457.871 106.207L440.407 77.046H478.458L500.28 106.207H457.86H457.871ZM439.918 76.2141L425.822 52.6659H460.228L477.847 76.2141H439.918ZM425.322 51.834L413.717 32.4564H445.098L459.594 51.834H425.322ZM412.249 31.6245H380.935L373.665 15.4302H402.556L412.249 31.6245ZM373.287 14.5983L367.139 0.899767H393.852L402.056 14.5983H373.287ZM372.375 14.5983H343.55L339.449 0.899767H366.217L372.364 14.5983H372.375ZM342.683 14.5983H313.825L311.78 0.899767H338.581L342.683 14.5983ZM312.992 14.5983H284.123V0.899767H310.946L312.992 14.5983ZM283.289 14.5983H254.42L256.465 0.899767H283.289V14.5983ZM253.575 14.5983H224.717L228.819 0.899767H255.62L253.575 14.5983ZM223.85 14.5983H195.036L201.184 0.899767H227.952L223.85 14.5983ZM194.114 14.5983H165.344L173.548 0.899767H200.261L194.114 14.5983ZM193.736 15.4302L186.466 31.6245H155.151L164.844 15.4302H193.736ZM154.173 31.6245H122.925L135.041 15.4302H163.866L154.173 31.6245ZM153.672 32.4564L142.067 51.834H107.795L122.291 32.4564H153.672ZM141.578 52.6659L127.482 76.2141H89.5533L107.173 52.6659H141.578ZM126.982 77.046L109.518 106.207H67.0983L88.9197 77.046H126.971H126.982ZM109.029 107.039L86.8965 144.008H38.8183L66.4869 107.039H109.029ZM109.996 107.039H152.605L136.008 144.008H87.8747L110.007 107.039H109.996ZM135.63 144.84L113.954 193.112H58.472L87.3745 144.84H135.63ZM136.542 144.84H184.854L170.402 193.112H114.865L136.542 144.84ZM185.721 144.84H234.066L226.84 193.112H171.269L185.721 144.84ZM234.911 144.84H283.278V193.112H227.685L234.911 144.84ZM284.111 144.84H332.479L339.704 193.112H284.111V144.84ZM333.323 144.84H381.668L396.12 193.112H340.549L333.323 144.84ZM382.535 144.84H430.847L452.524 193.112H396.987L382.535 144.84ZM431.759 144.84H480.015L508.917 193.112H453.435L431.759 144.84ZM480.993 144.84H529.193L565.321 193.112H509.895L480.993 144.84ZM431.725 14.6094H403.023L394.819 0.910853H421.476L431.725 14.6094ZM145.913 0.910853H172.57L164.366 14.6094H135.664L145.913 0.910853ZM38.218 144.829H86.4185L57.516 193.101H2.08994L38.218 144.829Z'
                    fill='url(#paint0_radial_28277_8486)'
                  />
                  <defs>
                    <radialGradient
                      id='paint0_radial_28277_8486'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(283.115 90.2439) rotate(3.8316) scale(189.71 83.2907)'
                    >
                      <stop stop-color='#EE223C' />
                      <stop
                        offset='0.27'
                        stop-color='#F26922'
                        stop-opacity='0.63'
                      />
                      <stop
                        offset='0.54'
                        stop-color='#FA9F1A'
                        stop-opacity='0.76'
                      />
                      <stop offset='1' stop-color='#FAA41A' stop-opacity='0' />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <DotLottiePlayer
                lottieRef={lottieRef}
                src='/landing/bvm-lego-updated-3.lottie'
              />
            </div>
          </div>

          <div className={s.intro_inner_bottom}>
            <p className={s.intro_inner_bottom_cotnent}>
              Step inside
            </p>
            <div className={s.drag} onMouseMove={onMouse} onTouchMove={onMouse}>
              <div ref={gradientRef} className={s.drag_line}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='130'
                  height='2'
                  viewBox='0 0 130 2'
                  fill='none'
                >
                  <path
                    d='M0.827713 0.840111L0.427124 0.840111L0.427124 1.64131L0.827713 1.64131L0.827713 0.840111ZM129.019 0.840126L127.016 0.840125L127.016 1.64132L129.019 1.64132L129.019 0.840126ZM123.01 0.840125L119.004 0.840124L119.004 1.64132L123.01 1.64132L123.01 0.840125ZM114.998 0.840124L110.992 0.840123L110.992 1.64132L114.998 1.64132L114.998 0.840124ZM106.986 0.840123L102.98 0.840123L102.98 1.64132L106.986 1.64132L106.986 0.840123ZM98.974 0.840122L94.968 0.840122L94.968 1.64132L98.974 1.64132L98.974 0.840122ZM90.9621 0.840121L86.9561 0.840121L86.9561 1.64132L90.9621 1.64132L90.9621 0.840121ZM82.9501 0.84012L78.9442 0.84012L78.9442 1.64131L82.9501 1.64131L82.9501 0.84012ZM74.9382 0.840119L70.9322 0.840119L70.9322 1.64131L74.9382 1.64131L74.9382 0.840119ZM66.9263 0.840119L62.9203 0.840118L62.9203 1.64131L66.9263 1.64131L66.9263 0.840119ZM58.9143 0.840118L54.9083 0.840117L54.9083 1.64131L58.9143 1.64131L58.9143 0.840118ZM50.9024 0.840117L46.8964 0.840116L46.8964 1.64131L50.9024 1.64131L50.9024 0.840117ZM42.8904 0.840116L38.8844 0.840115L38.8844 1.64131L42.8904 1.64131L42.8904 0.840116ZM34.8785 0.840115L30.8725 0.840114L30.8725 1.64131L34.8785 1.64131L34.8785 0.840115ZM26.8665 0.840114L22.8605 0.840114L22.8605 1.64131L26.8665 1.64131L26.8665 0.840114ZM18.8546 0.840113L14.8486 0.840113L14.8486 1.64131L18.8546 1.64131L18.8546 0.840113ZM10.8426 0.840112L6.83665 0.840112L6.83665 1.64131L10.8426 1.64131L10.8426 0.840112ZM2.83068 0.840111L0.827713 0.840111L0.827713 1.64131L2.83068 1.64131L2.83068 0.840111Z'
                    fill='url(#paint0_linear_28257_8061)'
                  />
                  <defs>
                    <linearGradient
                      id='paint0_linear_28257_8061'
                      x1='0.827713'
                      y1='1.24071'
                      x2='131.562'
                      y2='1.24072'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stop-color='white' stop-opacity='0' />
                      <stop offset='0.9999' stop-color='white' />
                      <stop offset='1' stop-color='white' stop-opacity='0' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                ref={refWrap}
                className={s.drag_inner}
                onMouseLeave={onMouseUp}
              >
                <button
                  ref={refBtn}
                  onMouseDown={onMouseDown}
                  onTouchStart={onMouseDown}
                  onTouchEnd={onMouseUp}
                  onMouseUp={onMouseUp}
                >
                  <img src='/landing/drag.svg?v=3s' alt='drag' />
                </button>
              </div>
              <button className={s.mood}>
                <img className={s.mood_substract} src='/landing/subtract.svg?v=2' alt='substract' />
                <img className={s.mood_door} src='/landing/door.png' alt='door' />
                <div ref={refFlare} className={s.flare}>

                </div>
              </button>
            </div>
          </div>

        </div>
      )}
      <div className={s.sky} ref={refSky}></div>
    </div>
  );
}
