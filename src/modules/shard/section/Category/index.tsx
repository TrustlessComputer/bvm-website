import s from './style.module.scss';
import ContainerDiv from '@components/Container';
import CardFi from '@/modules/shard/components/CardFi';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import { useMemo } from 'react';
import BigNumberJS from 'bignumber.js';
import { formatCurrency } from '@utils/format';

const cardGameFiData = [
  {
    id: 0,
    title: 'Manage the BVM Treasury',
    description:
      '<!--As of March 25, 2024, the BVM Treasury is <strong>$195,035,230</strong>.<br/><br/>-->SHARD holders collectively make decisions and steer the direction of the BVM ecosystem. SHARD holders can propose and vote on various initiatives, including launching a marketing campaign, building a new product, or funding an ambitious Bitcoin L2 builder.',
    image: '/shard/shard_1.webp',
    bgColorImage: '#FAC5FF',
    actionTitle: `Treasury <strong>50,000,000 BVM</strong>. <a href='/bvm' target='_self'>Learn more</a>`,
    actionUrl: '/bvm',
  },
  {
    id: 1,
    title: 'Receive airdrops from different Bitcoin L2s',
    description:
      'While we don’t want to spoil any surprises, you can expect some hot airdrops from Bitcoin L2 projects powered by BVM. The more SHARD you have, the bigger airdrops you’ll likely receive.',
    image: '/shard/shard_2.webp',
    bgColorImage: '#8CD3C2',
    actionTitle: `Upcoming airdrop: <strong>SHARD holders are among recipients of the 50,000,000 $EAI airdrop program</strong>. <a href='https://eternalai.org/' target='_blank'>Learn more</a>`,
    actionUrl: 'https://eternalai.org/',
  },
  {
    id: 2,
    title: 'Earn more BVM',
    description:
      'When you stake BVM, you’ll both mine SHARD and earn BVM with a 25% - 58% interest.',
    image: '/shard/shard_3.webp',
    bgColorImage: '#FFD73B',
    actionTitle: `Stake and earn up to 58% interest. <a href='https://nakachain.xyz/staking/dashboard' target='_blank'>Learn more</a>`,
    actionUrl: 'https://nakachain.xyz/staking/dashboard',
  },
  {
    id: 3,
    title: 'Get exclusive access to deal flow',
    description:
      'You’ll have exclusive access to new crypto deals and exclusive launchpad projects — just for you. We’ll set aside some allocation for you. That’s why it’s incredible to be a SHARD holder.',
    image: '/shard/shard_4.webp',
    bgColorImage: '#B3FFBF',
    actionTitle: `Upcoming deal: <strong>Up to 30% bonus token from Eternal AI public sale</strong>. <a href='https://nakachain.xyz/launchpad/detail/2' target='_blank'>Learn more</a>`,
    actionUrl: 'https://nakachain.xyz/launchpad/detail/2',
  },
];

const Category = () => {
  const coinPrices = useSelector(commonSelector).coinPrices;
  const bvmPrice = useMemo(() => coinPrices?.['BVM'] || '0', [coinPrices]);

  return (
    <ContainerDiv>
      <div className={`${s.cateWrapper}`}>
        {cardGameFiData.map((item, id) => {
          const treasuryValue = new BigNumberJS(50000000).multipliedBy(bvmPrice).toFixed(0);
          const data = {
            ...item,
            actionTitle: id === 0 ? `Treasury <strong>50,000,000 BVM ($${formatCurrency(treasuryValue, 0, 0, 'BTC', true)})</strong>. <a href='/bvm' target='_self'>Learn more</a>` : item.actionTitle,
          }
          return <CardFi key={id} {...data} />;
        })}
      </div>
    </ContainerDiv>
  );
};
export default Category;
