import CardFi from '@components/CardFi';
import s from './style.module.scss';
import ContainerDiv from '@components/Container';

const cardGameFiData = [
  {
    id: 0,
    title: 'Governance',
    description:
      'Co-manage the $200M BVM treasury with other SHARD holders.',
    image: '/shards/shard_1.webp',
    bgColorImage: '#FAC5FF',
  },
  {
    id: 1,
    title: 'Airdrop',
    description:
      'The more SHARDs you have, the more airdrops you’ll receive.',
    image: '/shards/shard_2.webp',
    bgColorImage: '#8CD3C2',
  },
  {
    id: 2,
    title: 'Earn BVM',
    description:
      'Enjoy 25%-58% BVM interest on the BVM you stake - in addition to the SHARDS you mine.',
    image: '/shards/shard_3.webp',
    bgColorImage: '#FFD73B',
  },
  {
    id: 3,
    title: 'Dealflow',
    description:
      'Your exclusive access to new crypto deals.',
    image: '/shards/shard_4.webp',
    bgColorImage: '#B3FFBF',
  },
];

const Category = () => {
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
export default Category;
