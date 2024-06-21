import React from 'react';
import s from './styles.module.scss';
import Hero from '@/modules/ModuleDetail/Hero';
import useWhiteBackground from '@hooks/useWhiteBackground';
import Section from '@/modules/ModuleDetail/Section';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';

const ModuleDetail = (): React.JSX.Element => {
  useWhiteBackground();
  const router = useRouter();
  return (
    <div className={s.wrapper}>
      <Hero />
      <Section title={'Why BitZK?'}>
        <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
          <p className={s.desc}>
            Bitcoin Zero Knowledge (BitZK) is the first modular ZK rollup platform on Bitcoin. It offers the broadest
            and deepest choices, with the latest data availability layers, hardware nodes, pre-installed apps, and
            pricing models to help you best match your app requirements.
          </p>
        </Fade>
      </Section>
      <Section title={'Benefits of BitZK'}>
        <ul>
          <li className={s.item}>
            <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
              <p className={s.heading}>1-click deploy</p>
              <p className={s.desc}>
                Our intuitive UI makes deploying and managing a Bitcoin ZK rollup simple.
              </p>
            </Fade>
          </li>

          <li className={s.item}>
            <Fade delay={0.2} from={{ y: 40 }} to={{ y: 0 }}>
              <p className={s.heading}>Scale as your usage grows</p>
              <p className={s.desc}>
                Optimize performance and cost with flexible plans. You could start with the Bootstrap plan and upgrade
                to the Growth as your app grows.
              </p>
            </Fade>
          </li>

          <li className={s.item}>
            <Fade delay={0.3} from={{ y: 40 }} to={{ y: 0 }}>
              <p className={s.heading}>SLA commitment</p>
              <p className={s.desc}>
                Access reliable, scalable infrastructure on demand. Scale capacity within minutes with an SLA commitment
                of 99.99% availability.
              </p>
            </Fade>
          </li>
        </ul>
      </Section>
      <Section title={'How it works'}>

        <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
          <p className={s.desc}>
            BitZK lets you deploy your own ZK rollup on Bitcoin with a few clicks and start building decentralized
            applications for Bitcoin.
          </p>
          <div className={s.link} onClick={() => router.push('https://x.com/punk3700/status/1796119677577605380')}>
            <p>Learn more</p>
            <div className={s.link_icon}>
              <ImagePlaceholder src={'/icons/ic_chevron_right.svg'} alt={'ic_chevron_right'} width={16} height={16} />
            </div>
          </div>
        </Fade>

        <Fade delay={0.3} from={{ y: 40 }} to={{ y: 0 }}>
          <div>
            <ImagePlaceholder
              src={'/bvm.jpg'}
              alt={'img'}
              width={820}
              height={440}
            />
          </div>
        </Fade>
      </Section>
    </div>
  );
};

export default ModuleDetail;
