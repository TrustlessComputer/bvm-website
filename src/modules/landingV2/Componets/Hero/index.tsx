// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/skyblue';
// or only core styles
import SvgInset from '@/components/SvgInset';
import SlideItem from '@/modules/landingV2/Componets/Hero/SlideItem';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import cn from 'classnames';
import s from './styles.module.scss';

export default function HeroV2() {
  return (
    <div className={s.hero}>
      <Splide
        hasTrack={false}
        options={{
          type: 'loop',
          focus: 'center',

          // autoWidth: true,
          updateOnMove: true,
          perPage: 1,
        }}
      >
        <SplideTrack>
          <SplideSlide>
            <SlideItem
              title={'Eternal AI'}
              srcVideo={'/landing-v2/video/LP_Banner_03.mp4'}
              poster={'/landing-v2/video/eai-poster.jpg'}
              action={'https://eternalai.org/'}
              target={'_blank'}
            >
              A Bitcoin L2 powering programmable and composable real-life AI
              models on Bitcoin
            </SlideItem>
          </SplideSlide>



          <SplideSlide>
            <SlideItem
              title={'Naka Chain'}
              srcImg={'/landing-v2/images/naka-chain-hero.jpeg'}
              action={'https://nakachain.xyz/'}
              target={'_blank'}
            >
              A powerful Bitcoin L2 for DeFi. 2-second block time. $0.0001
              transaction fee. 100% permissionless.
            </SlideItem>
          </SplideSlide>

          <SplideSlide>
            <SlideItem
              title={'Rune Chain'}
              srcVideo={'/landing-v2/video/Runechain_Teaser.mp4'}
              poster={'/landing-v2/video/runechain-post.jpg'}
              action={'https://runechain.com/'}
              target={'_blank'}
            >
              A Bitcoin L2 that scales Bitcoin for rune trading. It’s made for
              mass adoption with a rock bottom $0.001 average transaction fee
              and a nimble 1-second block time.
            </SlideItem>
          </SplideSlide>
        </SplideTrack>

        <div className={cn('splide__arrows container', s.arrows)}>
          <button className="splide__arrow splide__arrow--prev ">
            <span>
              <SvgInset
                svgUrl={'/landing-v2/svg/arrow-l.svg'}
                className={'reverse'}
              />
            </span>
          </button>
          <button className="splide__arrow splide__arrow--next ">
            <span>
              <SvgInset svgUrl={'/landing-v2/svg/arrow-r.svg'} />
            </span>
          </button>
        </div>
      </Splide>
    </div>
  );
}
