'use client';

import { Box } from '@chakra-ui/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import s from './styles.module.scss';

const BASE_COLOR = "#ffffff17";
const HIGHLIGHT_COLOR = "#12121200";

const renderSkeletonByClassName = (
  className?: string | undefined,
  count?: number,
) => (
  <div>
    <Skeleton
      baseColor={BASE_COLOR}
      highlightColor={HIGHLIGHT_COLOR}
      className={className || ''}
      count={count}
    />
  </div>
);

const SkeletonPayment = () => {
  return (
    <div className={s.container}>
      <Box height={'10px'} />
      <div className={s.row} style={{ justifyContent: 'center' }}>
        {renderSkeletonByClassName(s.header)}
      </div>

      <Box height={'20px'} />
      {renderSkeletonByClassName(s.box, 1)}

      <Box height={'10px'} />
      <div className={s.row} style={{ justifyContent: 'center' }}>
        {renderSkeletonByClassName(s.changeDepositMethod)}
      </div>
    </div>
  );
};

export default SkeletonPayment;
