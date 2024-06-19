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
          <h4 className={s.content_group_title}>5 years.</h4>
          <p className={s.content_group_decs}>
            That’s a magic number—not too short and not too long. 5 years is the
            perfect length of time to build something meaningful. It’s just the
            right amount of time to tackle a big, ambitious problem and make an
            impact.
          </p>
        </div>
        <div className={s.content_group}>
          <h4 className={s.content_group_title}>
            So what do we want to build?
          </h4>
          <p className={s.content_group_decs}>
            The common thread with our ideas is that we want to build something
            on Bitcoin. This could be: generative art, on-chain AI,
            decentralized financial infrastructure, or even autonomous worlds.
            <br />
            <br />
            We’re seeking to generalize the use of Bitcoin by making it more
            than just a cryptocurrency. We want art, AI, Metaverse, DeFi and
            games all on Bitcoin.
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
