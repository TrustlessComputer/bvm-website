// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import SlideItem from '@/modules/landingV2/Componets/Hero/SlideItem';
import s from './styles.module.scss';
import Container from '@/modules/landingV2/Componets/Container';

export default function HeroV2() {

  return <div className={s.hero}>
    <Container>
      <Splide hasTrack={false} options={{
        type: 'loop',
        focus: 'center',
        autoWidth: true,
        padding: '24px',
        updateOnMove: true,
        pagination: false
      }}>
        <SplideTrack>
          <SplideSlide>
            <SlideItem title={'Eternal AI'} src={'/images/hero-slide-item.jpeg'} action={'#'}>Powerful infrastructure
              and
              tools to build and scale your own Bitcoin L2 with ease.</SlideItem>
          </SplideSlide>
          <SplideSlide>
            <SlideItem title={'Eternal AI'} src={'/images/hero-slide-item.jpeg'} action={'#'}>Powerful infrastructure
              and
              tools to build and scale your own Bitcoin L2 with ease.</SlideItem>
          </SplideSlide>
          <SplideSlide>
            <SlideItem title={'Eternal AI'} src={'/images/hero-slide-item.jpeg'} action={'#'}>Powerful infrastructure
              and
              tools to build and scale your own Bitcoin L2 with ease.</SlideItem>
          </SplideSlide>
        </SplideTrack>

        <div className='splide__arrows'>
          <button className='splide__arrow splide__arrow--prev'>
            <span>
              <img src={'/landing-v2/arrow-right.svg'} alt={'arrow-right'} className={'reverse'} />
            </span>
          </button>
          <button className='splide__arrow splide__arrow--next'>
          <span><img src={'/landing-v2/arrow-right.svg'}
                     alt={'arrow-right'} /></span>
          </button>
        </div>
      </Splide>
    </Container>
  </div>;
}
