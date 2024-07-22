import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

import SvgInset from '@/components/SvgInset';

import { adjustBrightness } from '../../utils';

import styles from './styles.module.scss';

type Position =
  | {
      first: true;
      last: false;
    }
  | {
      first: false;
      last: true;
    }
  | {
      first: false;
      last: false;
    };

type TitlePosition =
  | {
      titleInLeft: true;
      titleInRight: false;
    }
  | {
      titleInLeft: false;
      titleInRight: true;
    }
  | {
      titleInLeft: false;
      titleInRight: false;
    };

type Props = {
  background?: string;
  title?: string;
  icon?: string;
  disabled?: boolean;
  children?: React.ReactNode;
} & Position &
  TitlePosition;

const Lego = ({
  background = '#A041FF',
  icon,
  title,
  titleInLeft = false,
  titleInRight = false,
  disabled = false,
  first = false,
  last = false,
  children,
}: Props) => {
  return (
    <div
      className={cn(styles.lego, {
        [styles.lego__disabled]: disabled,
      })}
      style={{
        // @ts-ignore
        '--background-color': background,
        '--border-color': adjustBrightness(background, -20),
      }}
    >
      <div className={styles.lego__inner}>
        <div
          className={cn(
            styles.lego__inner__piece,
            styles.lego__inner__piece__top,
          )}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" size={28} />
        </div>

        {title && titleInLeft ? (
          <div
            className={cn(
              styles.lego__inner__label,
              styles.lego__inner__label__left,
            )}
          >
            {icon && <Image src={icon} width={20} height={20} alt="icon" />}
            <p>{title}</p>
          </div>
        ) : null}

        {children && <div className={styles.children}>{children}</div>}

        {title && titleInRight ? (
          <div
            className={cn(
              styles.lego__inner__label,
              styles.lego__inner__label__right,
            )}
          >
            {icon && <Image src={icon} width={20} height={20} alt="icon" />}
            <p>{title}</p>
          </div>
        ) : null}

        <div
          className={cn(
            styles.lego__inner__piece,
            styles.lego__inner__piece__bottom,
          )}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" size={28} />
        </div>
      </div>
    </div>
  );
};

export default Lego;

// import React, { useState } from 'react';
// import Image from 'next/image';

// import SvgInset from '@/components/SvgInset';

// import styles from './styles.module.scss';
// import { hexToHSB, hsbToHex } from '../../utils';
// import useStoreDropDown from '@/modules/blockchains/Buy/stores/useStoreDropdown';
// import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
// import { iconToolNames } from '../../data';

// type Props = {
//   background?: string;
//   parentOfNested?: boolean;
//   first?: boolean;
//   last?: boolean;
//   active?: boolean;
//   disabled?: boolean;
//   title?: string;
//   titleInLeft?: boolean;
//   titleInRight?: boolean;
//   icon?: string;
//   className?: string;
//   zIndex?: number;
//   suffix?: string;
// } & React.HTMLAttributes<HTMLDivElement>;

// function Lego({
//   background = '#A041FF',
//   title = '',
//   titleInLeft = false,
//   titleInRight = false,
//   first = false,
//   last = false,
//   active = false,
//   disabled = false,
//   suffix = '',
//   icon,
//   zIndex = 0,
//   className,
//   children,
//   ...props
// }: Props) {
//   const legoRef = React.useRef<HTMLDivElement | null>(null);
//   const { isCapture } = useCaptureStore();

//   const _icon =
//     iconToolNames.find(
//       (item) =>
//         icon?.replace('https://storage.googleapis.com/bvm-network', '') ===
//         item,
//     ) ||
//     icon ||
//     null;

//   React.useEffect(() => {
//     let parentLego = legoRef.current?.parentElement;

//     if (!parentLego) return;

//     parentLego.style.position = 'relative';
//     parentLego.style.zIndex = `${zIndex * 2} `;
//     parentLego.style.width = 'max-content';
//   }, [legoRef.current]);

//   const fillBackgroundAsHSB = hexToHSB(background);
//   const _background = hsbToHex(
//     fillBackgroundAsHSB?.h || 0,
//     fillBackgroundAsHSB?.s || 0,
//     (fillBackgroundAsHSB?.b || 100) - 20,
//   )?.split('.')[0];

//   return (
//     <React.Fragment>
//       <div
//         className={`${styles.wrapper} ${first ? styles.first : ''} ${
//           disabled ? styles.disabled : ''
//         } ${className}
//         `}
//         ref={legoRef}
//         style={{
//           zIndex: zIndex,
//           // @ts-ignore
//           '--fillBackground': background,
//           '--background': background ? _background : undefined,
//         }}
//         // @ts-ignore
//         {...props}
//       >
//         <SvgInset
//           svgUrl="/landingV3/svg/stud_head.svg"
//           className={styles.wrapper_studHead}
//         />
//         <div className={`${styles.inner}`}>
//           {title && titleInLeft ? (
//             <div className={`${styles.label} ${styles.label__left}`}>
//               {_icon && <Image src={_icon} alt="icon" width={24} height={24} />}
//               <p className={isCapture ? styles.label_margin : ''}>{title}</p>
//             </div>
//           ) : null}

//           {children && <div className={styles.options}>{children}</div>}

//           {(title || icon) && titleInRight ? (
//             <div className={`${styles.label} ${styles.label__right}`}>
//               {_icon && <Image src={_icon} alt="icon" width={16} height={16} />}
//               <p className={isCapture ? styles.label_margin : ''}>{title} </p>
//             </div>
//           ) : null}

//           <div className={styles.label}>
//             <p>{suffix}</p>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default React.memo(Lego);
