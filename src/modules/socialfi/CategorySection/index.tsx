import CardFi from '@/components/CardFi';
import ContainerDiv from '@/components/Container';
import s from '@/modules/gamefi/CategorySection/style.module.scss';

const cardGameFiData = [
  {
    id: 0,
    title: 'Personalize your social experiences',
    description:
      'Connect with others through chats, posts, and community activities',
    image: '/socialfi/SocialFi_1.png',
    bgColorImage: '#f2ffc1',
  },
  {
    id: 1,
    title: 'Integrate games for fun',
    description:
      'Easily integrate games or other kinds of engaging activities with 2-second block time and low transaction fees (less than $0.001 per transaction)',
    image: '/socialfi/SocialFi_2.png',
    bgColorImage: '#d175c8',
  },
  {
    id: 2,
    title: 'Earn rewards along the way',
    description:
      'Profit from referring more people to join, trading, and engaging in games and other activities.',
    image: '/socialfi/SocialFi_3.png',
    bgColorImage: '#b3ffbf',
  },
];

const CategorySection = () => {
  return (
    <ContainerDiv>
      <div className={`${s.cateWrapper}`}>
        {cardGameFiData.map((item, id) => {
          return <CardFi key={id} {...item} />;
        })}
      </div>
    </ContainerDiv>
  );
};
export default CategorySection;
