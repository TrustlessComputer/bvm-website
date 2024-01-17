'use client';
/* eslint-disable react/display-name */
import { Flex } from '@chakra-ui/react';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Loading from '../Loading';
import s from './ScrollWrapper.module.scss';
import cs from 'classnames';

interface props {
  children: React.ReactNode;
  onFetch: () => void;
  isFetching: boolean;
  hasIncrementedPageRef: any;
  onFetchNewData: () => void;
  onScroll?: (e: any) => void;
  className?: string;
  wrapClassName?: string;
  hideScrollBar?: boolean
}

const ScrollWrapper = forwardRef((props: props, ref) => {
  const {
    children,
    isFetching,
    hasIncrementedPageRef,
    onFetch,
    onFetchNewData,
    onScroll,
    className = '',
    wrapClassName = '',
    hideScrollBar = true
  } = props;

  // fetching data on scroll
  const feedContainerRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = () => {
    if (feedContainerRef && feedContainerRef?.current) {
      const container = feedContainerRef.current;
      if (container) {
        const isScrolledToBottom =
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - container.scrollHeight / 4;

        if (isScrolledToBottom && !isFetching && !hasIncrementedPageRef.current) {
          onFetch();
        }
      }
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        onScrollTo: (scrollTo: any) => {
          if (feedContainerRef.current) {
            return feedContainerRef.current?.scrollTo({
              left: 0,
              top: scrollTo,
              behavior: 'smooth',
            });
          }
        },
        currentScrollOffset: feedContainerRef.current?.scrollTop,
      };
    },
    [feedContainerRef.current],
  );

  useEffect(() => {
    if (feedContainerRef.current) {
      feedContainerRef.current!.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (feedContainerRef.current) {
        feedContainerRef.current!.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isFetching]);

  const handleRefresh = async () => {
    onFetchNewData();
  };

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      pullingContent={''}
      refreshingContent={
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Loading className={s.loading} />
        </Flex>
      }
      className={cs(
        s.refreshWrapper,
        className,
      )}
    >
      <div
        className={cs(
          s.wrapperScroll,
          wrapClassName,
          {
            [s.wrapperScroll__hideScrollBar]: hideScrollBar
          }
        )}
        ref={feedContainerRef}
        onScroll={(e) => onScroll?.(e)}
      >
        {children}
      </div>
    </PullToRefresh>
  );
});

export default ScrollWrapper;
