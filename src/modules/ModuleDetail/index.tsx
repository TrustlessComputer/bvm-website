import React from 'react';
import s from './styles.module.scss';
import Hero from '@/modules/ModuleDetail/Hero';
import useWhiteBackground from '@hooks/useWhiteBackground';
import Section from '@/modules/ModuleDetail/Section';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Fade from '@/interactive/Fade';

const ModuleDetail = (): React.JSX.Element => {
  useWhiteBackground();
  return (
    <div className={s.wrapper}>
      <Hero />
      <Section title={'Why BVM?'}>
        <Fade delay={0.1} delayEnter={0.1} from={{ y: 40 }} to={{ y: 0 }}>
          <p className={s.desc}>
            Amazon Elastic Compute Cloud (Amazon EC2) offers the broadest and
            deepest compute platform, with over 750 instances and choice of the
            latest processor, storage, networking, operating system, and
            purchase model to help you best match the needs of your workload. We
            are the first major cloud provider that supports Intel, AMD, and Arm
            processors, the only cloud with on-demand EC2 Mac instances, and the
            only cloud with 400 Gbps Ethernet networking. We offer the best
            price performance for machine learning training, as well as the
            lowest cost per inference instances in the cloud. More SAP, high
            performance computing (HPC), ML, and Windows workloads run on AWS
            than any other cloud.
          </p>
        </Fade>
      </Section>
      <Section title={'Benefits of BVM'}>
        <ul>
          <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
            <li className={s.item}>
              <p className={s.heading}>Tailored to your needs</p>
              <p className={s.desc}>
                Build faster on Bitcoin with all the best building blocks in the
                BVM Module Store. BVM provides a modular framework to tailor
                your ZK rollup to your app.
              </p>
            </li>
          </Fade>
          <Fade delay={0.2} from={{ y: 40 }} to={{ y: 0 }}>
            <li className={s.item}>
              <p className={s.heading}>Tailored to your needs</p>
              <p className={s.desc}>
                Build faster on Bitcoin with all the best building blocks in the
                BVM Module Store. BVM provides a modular framework to tailor
                your ZK rollup to your app.
              </p>
            </li>
          </Fade>
          <Fade delay={0.3} from={{ y: 40 }} to={{ y: 0 }}>
            <li className={s.item}>
              <p className={s.heading}>Tailored to your needs</p>
              <p className={s.desc}>
                Build faster on Bitcoin with all the best building blocks in the
                BVM Module Store. BVM provides a modular framework to tailor
                your ZK rollup to your app.
              </p>
            </li>
          </Fade>
        </ul>
      </Section>
      <Section title={'How it works'}>
        <ul>
          <Fade delay={0.1} from={{ y: 40 }} to={{ y: 0 }}>
            <li className={s.item}>
              <p className={s.heading}>Tailored to your needs</p>
              <p className={s.desc}>
                Build faster on Bitcoin with all the best building blocks in the
                BVM Module Store. BVM provides a modular framework to tailor
                your ZK rollup to your app.
              </p>
            </li>
          </Fade>
        </ul>
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
