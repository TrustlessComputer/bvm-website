import { TChainCard } from '@/modules/ExploreModule/components/ChainCard';
import { TDappCardProps } from '@/modules/ExploreModule/components/DappCard';
import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SectionItemApp from './Item/App';
import SectionItemGeneral from './Item/General';
import s from './SectionBlock.module.scss';
import Slider from 'react-slick';

export type BlockCardItem = Omit<TDappCardProps, 'idx'> & {
  logo: string;
  logoUrl?: string;
  id?: string;
  date?: string;
  popular?: boolean;
};

export type BlockChainItem = Omit<TChainCard, 'idx'> & {
  id?: string;
};

const SectionBlock = (props: any) => {
  const { tag, title, item, desc, spacing = '83px', id } = props;

  let sliderRef = useRef(null);

  const next = () => {
    (sliderRef as any).slickNext();
  };
  const previous = () => {
    (sliderRef as any).slickPrev();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const scrollWrapperRef = React.useRef<HTMLDivElement>(null);
  const itemsWrapperRef = React.useRef<HTMLDivElement>(null);

  const [showControls, setShowControls] = useState({
    prev: false,
    next: true,
  });

  const handleChangeDirection = useCallback(
    (direction: 'next' | 'prev') => {
      if (!scrollWrapperRef.current || !itemsWrapperRef.current) return;

      if (direction === 'prev') {
        scrollWrapperRef.current.scrollTo({
          left: scrollWrapperRef.current.scrollLeft - 1000,
          behavior: 'smooth',
        });

        // check first item of itemsWrapperRef is fully visible
      }

      if (direction === 'next') {
        scrollWrapperRef.current.scrollTo({
          left: scrollWrapperRef.current.scrollLeft + 1000,
          behavior: 'smooth',
        });
      }
    },
    [
      scrollWrapperRef.current,
      itemsWrapperRef.current,
      showControls.prev,
      showControls.next,
    ],
  );

  const isCardLayout = useMemo(() => {
    // check if props.id is within the list of card layout
    return ['apps', 'step-1', 'step-2'].includes(props.id);
  }, [props.id]);

  useEffect(() => {
    if (scrollWrapperRef.current && sliderRef.current) {
      const scrollWrapper = scrollWrapperRef.current;
      const itemsWrapper = sliderRef.current;

      if ((sliderRef as any).offsetWidth > scrollWrapper.offsetWidth) {
        setShowControls({
          prev: false,
          next: true,
        });
      } else {
        setShowControls({
          prev: false,
          next: false,
        });
      }
    }
  }, [scrollWrapperRef.current, sliderRef.current]);

  useEffect(() => {
    // check `${props.id}-0` is fully visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowControls((prev) => ({
          ...prev,
          prev: !entry.isIntersecting,
        }));
      },
      { root: scrollWrapperRef.current, threshold: 1 },
    );

    if (sliderRef.current) {
      observer.observe((sliderRef.current as any).children[0]);
    }
  }, []);

  useEffect(() => {
    // check `${props.id}-${item.length - 1}` is fully visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowControls((prev) => ({
          ...prev,
          next: !entry.isIntersecting,
        }));
      },
      { root: scrollWrapperRef.current, threshold: 1 },
    );

    if (sliderRef.current) {
      observer.observe(
        (sliderRef.current as any).children[item.length - 1] as HTMLElement,
      );
    }
  }, []);

  return (
    <Box>
      <div className={s.wrapper}>
        <Box w={{ base: '80%', md: '100%' }} className={s.heading}>
          <Box>
            {!!tag && <span className={s.tag}>{tag}</span>}
            {!!title && <span className={s.title}>{title}</span>}
          </Box>
          <p className={s.desc}>{desc}</p>
        </Box>
        <div className={s.scroll_wrapper} ref={scrollWrapperRef}>
          <Box
            className={cn(s.items_wrapper, {
              [s.items_wrapper__apps]: isCardLayout,
            })}
            // ref={itemsWrapperRef}
            mb={spacing}
          >
            <Slider
              {...settings}
              ref={(slider) => {
                sliderRef = slider as any;
              }}
            >
              {item.map(
                (item: BlockCardItem | BlockChainItem, index: number) => {
                  return (
                    <Box id={`${id}-${index}`}>
                      {isCardLayout ? (
                        <SectionItemApp
                          key={`${props.id}-${index}`}
                          item={item as BlockCardItem}
                          sectionId={props.id}
                        />
                      ) : (
                        <SectionItemGeneral
                          key={`${props.id}-${index}`}
                          id={props.id}
                          item={item}
                        />
                      )}
                    </Box>
                  );

                  // if (isCardLayout) {
                  //   return (
                  //     <SectionItemApp
                  //       key={`${props.id}-${index}`}
                  //       item={item as BlockCardItem}
                  //       sectionId={props.id}
                  //     />
                  //   );
                  // }

                  // return (
                  //   <SectionItemGeneral
                  //     key={`${props.id}-${index}`}
                  //     id={props.id}
                  //     item={item}
                  //   />
                  // );
                },
              )}
            </Slider>
          </Box>

          {!!showControls.prev && (
            <Box
              className={cn(s.prev_btn, s.control_btn)}
              top={props.id === 'news' ? 'calc(50% - 44px)' : '50%'}
              // onClick={() => handleChangeDirection('prev')}
              onClick={previous}
            >
              <img src="\landing-v4\ic-angle-right.svg"></img>
            </Box>
          )}

          {!!showControls.next && (
            <Box
              className={cn(s.next_btn, s.control_btn)}
              top={props.id === 'news' ? 'calc(50% - 44px)' : '50%'}
              onClick={next}
              // onClick={() => handleChangeDirection('next')}
            >
              <img src="\landing-v4\ic-angle-right.svg"></img>
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
};

export default SectionBlock;
