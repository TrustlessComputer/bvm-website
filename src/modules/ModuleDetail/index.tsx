import React from 'react';
import s from './styles.module.scss';
import Hero from '@/modules/ModuleDetail/Hero';
import useWhiteBackground from '@hooks/useWhiteBackground';
import Section from '@/modules/ModuleDetail/Section';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IMODULE } from '@/app/module/data';
import Image from 'next/image';
import { Box, Grid } from '@chakra-ui/react';

const ModuleDetail = ({ data }: { data: IMODULE }): React.JSX.Element => {
  useWhiteBackground();
  const router = useRouter();
  return (
    <div className={s.wrapper}>
      <Hero data={data.hero} />
      <Section title={data.why.title}>
        <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
          <p className={s.desc}>{data.why.desc}</p>
        </Fade>
      </Section>
      <Section title={data.benefit.title}>
        <ul>
          {data.benefit.contents.map((content) => {
            return (
              <li className={s.item}>
                <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
                  <p className={s.heading}>{content.title}</p>
                  <p className={s.desc}>{content.desc}</p>
                </Fade>
              </li>
            );
          })}
        </ul>
      </Section>
      <Section title={data.hiw.title}>
        <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
          <p className={s.desc}>{data.hiw.desc}</p>
          {data.hiw.action && (
            <Link
              className={s.link}
              href={data.hiw.action}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Learn more</p>
              <div className={s.link_icon}>
                <img
                  src={'/icons/ic_chevron_right.svg'}
                  alt={'ic_chevron_right'}
                  width={16}
                  height={16}
                />
              </div>
            </Link>
          )}
        </Fade>

        {data.hiw.thumbnail && (
          <Fade delay={0.3} from={{ y: 40 }} to={{ y: 0 }}>
            <div>
              <ImagePlaceholder
                src={data.hiw.thumbnail}
                alt={'img'}
                width={820}
                height={440}
              />
            </div>
          </Fade>
        )}

        {data.hiw?.video && (
          <Fade delay={0.3} from={{ y: 40 }} to={{ y: 0 }}>
            <div>
              <video
                className={s.hiwVideo}
                src={data.hiw?.video}
                width={160}
                height={90}
                controls
                playsInline
              />
            </div>
          </Fade>
        )}
      </Section>
      {!!data?.footer && (
        <div className={s.footer}>
          <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
            <Box
              // placeItems={'center'}
              position="relative"
              w="100%"
              aspectRatio={'384 /97'}
            >
              <Image
                className={s.footer_bg}
                src={data.footer.background}
                alt={data.footer.title}
                layout="fill"
              />
              <div className={s.footer_content}>
                <p className={s.footer_subTitle}>{data.footer.subTitle}</p>
                <p className={s.footer_title}>{data.footer.title}</p>
                <p className={s.footer_desc}>{data.footer.desc}</p>
                <Link
                  href={data.footer.button.link}
                  rel="noopener noreferrer"
                  className={s.footer_link}
                >
                  {data.footer.button.text}
                </Link>
              </div>
            </Box>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default ModuleDetail;
