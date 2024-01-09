import ItemHero from './ItemHero';
import s from './styles.module.scss';

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
    icon: '/landing/svg/lego_celestia.svg',
    title: 'Celestia',
  },
  {
    icon: '/landing/svg/logo_eigen.svg',
    title: 'Eigen',
  },
];

export default function Hero() {
  return (
    <div className={s.listHero}>
      {DATA_HERO.map((item, index) => {
        return (
          <ItemHero data={{ index, length: DATA_HERO.length - 1, ...item }} />
        );
      })}
    </div>
  );
}
