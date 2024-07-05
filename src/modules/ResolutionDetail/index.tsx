'use client';

import React from 'react';
import s from './styles.module.scss';
import useWhiteBackground from '@hooks/useWhiteBackground';
import Section from '@/modules/ModuleDetail/Section';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Fade from '@/interactive/Fade';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import RetroHeroV2 from "@components/Retro/RetroHeroV2";
import {IRESOLUTION} from "@constants/solution-data";
import RetroCaseStudyV2 from "@components/Retro/RetroCaseStudyV2";

const ResolutionDetail = ({data}: { data: IRESOLUTION }): React.JSX.Element => {
  useWhiteBackground();
  const router = useRouter();
  return (
    <div className={s.wrapper}>
      <RetroHeroV2
        label={data.hero.label}
        subTitle={data.hero.subTitle}
        btn1={data.hero.btn1}
        btn2={data.hero?.btn2}
        src={data.hero.src}
      >
        {data.hero.heading}
      </RetroHeroV2>

      {
        data.why &&  <Section title={data.why.title}>
          <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
            <p className={s.desc}>
              {
                data.why.content
              }
            </p>
          </Fade>
        </Section>
      }


      <Section title={data.list.title}>
        <ul>
          {
            data.list.contents.map(content => {
              return <li className={s.item}>
                <Fade delay={0.1} from={{y: 40}} to={{y: 0}}>
                  <p className={s.heading}>{content.title}</p>
                  <p className={s.desc}>
                    {content.desc}
                  </p>
                </Fade>
              </li>;
            })
          }
        </ul>
      </Section>
      {
        data.case && <Section title={data.case?.title}>
          <RetroCaseStudyV2
            btn={data.case.btn}
            src={data.case.thumbnail}
            brand={data.case.icon}
            heading={data.case.heading}
          >
            {data.case.desc}
          </RetroCaseStudyV2>
        </Section>
      }
      {
        data.hiw && <Section title={data.hiw.title}>
          <Fade delay={0.1} from={{y: 40}} to={{y: 0}}>
            <p className={s.desc}>
              {
                data.hiw.desc
              }
            </p>
            {
              data.hiw.action &&
              <Link className={s.link} href={data.hiw.action} target="_blank" rel="noopener noreferrer">
                <p>Learn more</p>
                <div className={s.link_icon}>
                  <ImagePlaceholder src={'/icons/ic_chevron_right.svg'} alt={'ic_chevron_right'} width={16} height={16}/>
                </div>
              </Link>
            }
          </Fade>

          {
            data.hiw.thumbnail && <Fade delay={0.3} from={{y: 40}} to={{y: 0}}>
              <div>
                <ImagePlaceholder
                  src={data.hiw.thumbnail}
                  alt={'img'}
                  width={820}
                  height={440}
                />
              </div>
            </Fade>
          }

        </Section>
      }

    </div>
  );
};

export default ResolutionDetail;
