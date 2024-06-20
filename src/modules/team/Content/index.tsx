import React from 'react';
import s from './styles.module.scss';
import { DATA_EXPLORE } from '../data-team';
import Image from 'next/image';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export default function Content() {
  return (
    <div className="containerV3">
      <div className={s.content}>
        <div className={s.content_group}>
          <h4 className={s.content_group_title}>Our story</h4>
          <p className={s.content_group_decs}>
            BVM was born in January 2023 when a group of friends came together
            one weekend to brainstorm ideas. Every time a new concept surfaced,
            we asked ourselves one question: Where do we see this project in
            five years?
          </p>
        </div>
        <div className={s.content_group}>
          <h4 className={s.content_group_title}>Five years.</h4>
          <p className={s.content_group_decs}>
            That’s a magic number—not too short, not too long. Five years is the
            perfect timeframe to build something meaningful. It’s just the right
            amount of time to tackle a big, ambitious problem and make an
            impact.
            <br /> <br />
            <strong>So, what did we want to build?</strong>
            <br /> <br />
            That day, we bounced around various ideas, from generative art and
            on-chain AI to decentralized financial infrastructure and autonomous
            worlds.
            <br /> <br />
            The common thread? We wanted to build on Bitcoin. It could be
            anything, but it had to be on Bitcoin.
            <br /> <br />
            We shared a vision: to make Bitcoin more than a cryptocurrency. We
            envision art, AI, the Metaverse, DeFi, and games—all on Bitcoin.
            <br /> <br />
            We wanted to create a radically new way to explore Bitcoin.
            <br /> <br />
            <strong> Bitcoin, reimagined.</strong>
            <br /> <br />
            This is Bitcoin redesigned—for the next generation of Bitcoin
            builders who want to reshape its future.
            <br /> <br />
            We’ve made significant progress, but there’s still much more to do.
            <br /> <br />
            It’s time to build.
            <br /> <br />
          </p>
        </div>
      </div>

      {/* <div className={s.explore}>
        <h3 className={s.explore_title}>
          We want to build a radically new way to explore Bitcoin.
        </h3>

        <div className={s.explore_list}>
          {DATA_EXPLORE.map((item) => {
            return (
              <div className={s.explore_item}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                />
                <h5 className={s.explore_item_title}>{item.title}</h5>
                <p className={s.explore_item_decs}> {item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={s.reimagined}>
        <div className={`${s.content_group} ${s.reimagined_heading}`}>
          <h4 className={s.content_group_title}>Bitcoin, reimagined.</h4>
          <p className={s.content_group_decs}>
            This is Bitcoin redesigned—for New Bitcoiners who want to reimagine
            the future of Bitcoin. We’ve made heaps of progress, but there’s
            still much more to do!
          </p>
        </div>

        <div className={s.reimagined_image}>
          <ImagePlaceholder
            className={s.reimagined_image_inner}
            src={'/landingV3/images/bg_explore.jpg'}
            width={1775}
            alt="gamefi"
            height={861}
          />
        </div>
      </div>

      <div className={s.history}>
        <div className={s.histor}></div>
      </div> */}
    </div>
  );
}
