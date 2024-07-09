import React from 'react';

import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import SvgInset from '@/components/SvgInset';

const CannotModifiedNoti = () => {
  const router = useRouter();

  return (
    <div className={s.notiWraper}>
      <span className={s.link} onClick={() => router.push('/pricing')}>
        Switch tier for more option
      </span>
      <SvgInset svgUrl="/icons/arrow-right-up.svg" />
    </div>
  );
};

export default React.memo(CannotModifiedNoti);
