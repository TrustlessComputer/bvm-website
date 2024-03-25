import React from 'react';
import SimpleContent from '../SimpleContent';
import { SimpleData } from '../data';
import s from './styles.module.scss';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import useWindowResize, { useIsTablet } from '@/hooks/useWindowResize';
import HeadingTyping from '@/interactive/Signal/Chars/typing';
import LinesRandom from '@/interactive/Signal/Lines/Random';
import Fade from '@/interactive/Signal/Fade';

export default function SimpleMobile() {
  const isTablet = useIsTablet();
  return (
    <div className={s.simpleMobile}>
      {SimpleData.map((item, index) => {
        return (
          <div className={s.simpleMobile_item} key={index}>
            <div className={s.simpleMobile_item_content}>
              <HeadingTyping delayTrigger={0.3}>
                <h4 className={s.simpleMobile_item_title}>{item.title}</h4>
              </HeadingTyping>
              <LinesRandom delayTrigger={0.45}>
                <p className={s.simpleMobile_item_decs}>{item.content}</p>
              </LinesRandom>
              {/*{isTablet && (*/}
              {/*  <Fade delayTrigger={0.6}>*/}
              {/*    <Button isWhite className={s.simpleMobile_item_button}>*/}
              {/*      BUILDING NOW*/}
              {/*    </Button>*/}
              {/*  </Fade>*/}
              {/*)}*/}
            </div>
            <Fade delayTrigger={0.6}>
              <figure className={s.simpleMobile_item_image}>
                <ImagePlaceholder
                  alt={item.title}
                  src={item.image}
                  width={335}
                  height={335}
                />
              </figure>
            </Fade>
            {/*{!isTablet && (*/}
            {/*  <Fade delayTrigger={0.9}>*/}
            {/*    <Button isWhite className={s.simpleMobile_item_button}>*/}
            {/*      BUILDING NOW*/}
            {/*    </Button>*/}
            {/*  </Fade>*/}
            {/*)}*/}
          </div>
        );
      })}
    </div>
  );
}
