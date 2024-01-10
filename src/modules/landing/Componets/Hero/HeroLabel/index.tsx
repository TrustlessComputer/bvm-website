import s from './styles.module.scss';
import ItemHero from '@/modules/landing/Componets/Hero/ItemHero';
import Image from 'next/image';
import Fade from '@/interactive/Fade';

const DATA_HERO = [
  {
    icon: '/landing/svg/lego_coin.svg',
    title: 'Bitcoin',
  },
  {
    icon: '/landing/svg/lego_optimism.svg',
    title: 'Optimism',
  },
  {
    icon: '/landing/svg/lego_polygon.svg',
    title: 'Polygon',
  },
  {
    icon: '/landing/svg/logo_eigen.svg',
    title: 'Eigen',
  },
  {
    icon: '/landing/svg/lego_celestia.svg',
    title: 'Celestia',
  },
];
export default function HeroLabel() {
  return (
    <div className={s.heroLabel}>
      <Fade delay={0.4}>
        <div className={s.heroLabel_content}>
          <Image
            src={'/landing/svg/lego_icon_cube.svg'}
            alt="cube"
            width={32}
            height={32}
          />
          <p className={s.heroLabel_content_text}>
            Powered by blockchain building blocks
          </p>
        </div>
      </Fade>
      <div className={s.heroLabel_listHero}>
        {DATA_HERO.map((item, index) => {
          return <ItemHero delay={0.4 + index / 10} data={item} />;
        })}
      </div>
    </div>
  );
}
