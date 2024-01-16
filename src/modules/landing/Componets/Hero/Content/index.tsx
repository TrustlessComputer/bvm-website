import s from './styles.module.scss';
// import { useRouter } from 'next/navigation';
import Lines from '@/interactive/Lines';
import useWindowSize from '@/hooks/useWindowSize';
import React from 'react';
// import { getTopLeaderBoards } from '@/services/whitelist';
import BorderLine from '@/interactive/BorderLine';

export default function HeroContent() {
  const { mobileScreen, tabletScreen } = useWindowSize();
  // const router = useRouter();
  //
  // const [count, setCount] = React.useState('');
  //
  // const getCount = async () => {
  //   try {
  //     const response = await getTopLeaderBoards({ page: 1, limit: 20 });
  //     setCount(response.count)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  //
  //
  // React.useEffect(() => {
  //   getCount()
  // }, [])

  return (
    <div className={s.heroContent}>
      <div className={s.heroContent_inner}>
        <Lines delay={0.2}>
          BVM is the first modular blockchain metaprotocol that lets anyone launch their own Bitcoin L2 blockchain in a
          few clicks.
        </Lines>
      </div>
      <BorderLine delay={0.2} />
    </div>
  );
}
