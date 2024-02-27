import CardFi from '@/components/CardFi';
import s from './style.module.scss';

const cardGameFiData = [
  {
    id: 0,
    title: 'Personalize your social experiences',
    description:
      'Connect with others through chats, posts, and community activities',
    image: '/socialfi/SocialFi_1.png',
    bgColorImage: '#35cca6',
  },
  {
    id: 1,
    title: 'Integrate games for fun',
    description:
      'Easily integrate games or other kinds of engaging activities with 2-second block time and low transaction fees (less than $0.001 per transaction)',
    image: '/socialfi/SocialFi_2.png',
    bgColorImage: '#459443',
  },
  {
    id: 2,
    title: 'Earn rewards along the way',
    description:
      'Profit from referring more people to join, trading, and engaging in games and other activities.',
    image: '/socialfi/SocialFi_3.png',
    bgColorImage: '#74c9e4',
  },
];

const CategorySection = () => {
  return (
    <div className={`${s.cateWrapper}`}>
      {cardGameFiData.map((item, id) => {
        return <CardFi key={id} {...item} />;
      })}
    </div>
  );
};
export default CategorySection;
