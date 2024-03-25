import s from './style.module.scss';
import ContainerDiv from '@components/Container';
import CardFi from '@/modules/shard/components/CardFi';

const cardGameFiData = [
  {
    id: 0,
    title: 'Manage the BVM Treasury',
    description:
      '<!--As of March 25, 2024, the BVM Treasury is <strong>$195,035,230</strong>.<br/><br/>-->SHARD holders collectively make decisions and steer the direction of the BVM ecosystem. SHARD holders can propose and vote on various initiatives, including launching a marketing campaign, building a new product, or funding an ambitious Bitcoin L2 builder.',
    image: '/shards/shard_1.webp',
    bgColorImage: '#FAC5FF',
  },
  {
    id: 1,
    title: 'Receive airdrops from different Bitcoin L2s',
    description:
      'While we don’t want to spoil any surprises, you can expect some hot airdrops from Bitcoin L2 projects powered by BVM.<br/><br/>The more SHARD you have, the bigger airdrops you’ll likely receive.',
    image: '/shards/shard_2.webp',
    bgColorImage: '#8CD3C2',
  },
  {
    id: 2,
    title: 'Earn more BVM',
    description:
      'When you stake BVM, you’ll both mine SHARD and earn BVM with a 25% - 58% interest.',
    image: '/shards/shard_3.webp',
    bgColorImage: '#FFD73B',
  },
  {
    id: 3,
    title: 'Get exclusive access to deal flow',
    description:
      'You’ll have exclusive access to new crypto deals and exclusive launchpad projects — just for you. We’ll set aside some allocation for you. That’s why it’s incredible to be a SHARD holder.',
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
