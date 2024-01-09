import s from '@/modules/landing/Componets/Hero/styles.module.scss';
import ItemHero from '@/modules/landing/Componets/Hero/ItemHero';

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
    <div className={s.listHero}>
      {DATA_HERO.map((item, index) => {
        return <ItemHero delay={0.4 + index / 10} data={item} />;
      })}
    </div>
  );
}
