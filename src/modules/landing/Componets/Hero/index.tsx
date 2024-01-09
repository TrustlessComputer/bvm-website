import ItemHero from './ItemHero';
import s from './styles.module.scss';

const DATA_HERO = [
  {
    id: 1,
    icon: '/landing/svg/lego_coin.svg',
    title: 'Bitcoin',
  },
  {
    id: 2,
    icon: '/landing/svg/lego_optimism.svg',
    title: 'Optimism',
  },
  {
    id: 3,
    icon: '/landing/svg/lego_polygon.svg',
    title: 'Polygon',
  },
  {
    id: 4,
    icon: '/landing/svg/lego_celestia.svg',
    title: 'Celestia',
  },
  {
    id: 5,
    icon: '/landing/svg/logo_eigen.svg',
    title: 'Eigen',
  },
];

export default function Hero() {
  return (
    <div className={s.listHero}>
      {DATA_HERO.map((item, index) => {
        return (
          <ItemHero
            key={item.id}
            data={{ index, length: DATA_HERO.length - 1, ...item }}
          />
        );
      })}
    </div>
  );
}
