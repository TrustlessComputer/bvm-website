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
            BVM was born in January 2023 when a group of friends came together one weekend to brainstorm ideas. Every
            time a new concept surfaced, we asked ourselves one question: Where do we see this project in five years?
          </p>
        </div>
        <div className={s.content_group}>
          <h4 className={s.content_group_title}>Five years.</h4>
          <p className={s.content_group_decs}>
            That’s a magic number—not too short, not too long. Five years is the perfect timeframe to build something
            meaningful. It’s just the right amount of time to tackle a big, ambitious problem and make an impact.
          </p>
        </div>

        <div className={s.content_group}>
          <h4 className={s.content_group_title}>So, what did we want to build?</h4>
          <div className={s.content_group_decs}>
            <p> That day, we bounced around various ideas, from generative art and on-chain AI to decentralized
              financial
              infrastructure and autonomous worlds.</p>
            <p>
              The common thread? We wanted to build on Bitcoin. It could be anything, but it had to be on
              Bitcoin.
            </p>
            <p>We shared a vision: to make Bitcoin more than a cryptocurrency. We envision art, AI, the Metaverse, DeFi,
              and games—all on Bitcoin.</p>
            We wanted to create a radically new way to explore Bitcoin.
          </div>
        </div>
        <div className={s.content_group}>
          <h4 className={s.content_group_title}>Bitcoin, reimagined.</h4>
          <div className={s.content_group_decs}>
            <p> This is Bitcoin redesigned—for the next generation of Bitcoin builders who want to reshape its
              future. </p>
            <p>We’ve made significant progress, but there’s still much more to do.</p>
            It’s time to build.
          </div>
        </div>
      </div>
    </div>
  );
}
