import s from './style.module.scss';
import ContainerDiv from '@components/Container';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import { useMemo } from 'react';
import BigNumberJS from 'bignumber.js';
import { formatCurrency } from '@utils/format';
import CardFi from '../../components/CardFi';

const cardGameFiData = [
  {
    id: 0,
    title: 'Manage the BVM Treasury',
    description:
      'SHARD holders collectively make decisions and steer the direction of the BVM ecosystem. SHARD holders can propose and vote on various initiatives, including launching a marketing campaign, building a new product, or funding an ambitious Bitcoin L2 builder.',
    image: '/shard/shard_1.webp',
    bgColorImage: '#FAC5FF',
    actionTitle: `Treasury <strong>50,000,000 BVM $treasuryValue</strong>.<br/> <a href='/bvm' target='_self'>Learn more <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33357 14.1667C8.12023 14.1667 7.90687 14.0851 7.74437 13.9226C7.41854 13.5967 7.41854 13.07 7.74437 12.7442L10.4885 10L7.74437 7.25589C7.41854 6.93006 7.41854 6.40334 7.74437 6.0775C8.07021 5.75167 8.59693 5.75167 8.92276 6.0775L12.2561 9.41084C12.5819 9.73667 12.5819 10.2634 12.2561 10.5892L8.92276 13.9226C8.76026 14.0851 8.5469 14.1667 8.33357 14.1667Z" fill="#FA4E0E"/>
</svg>
</a>`,
  },
  {
    id: 1,
    title: 'Receive airdrops from different Bitcoin L2s',
    description:
      'While we don’t want to spoil any surprises, you can expect some hot airdrops from Bitcoin L2 projects powered by BVM. The more SHARD you have, the bigger airdrops you’ll likely receive.',
    image: '/shard/shard_2.webp',
    bgColorImage: '#8CD3C2',
    actionTitle: `Upcoming airdrop: <strong>SHARD holders are among recipients of the 50,000,000 $EAI airdrop program</strong>.<br/> <a href='https://eternalai.org/' target='_blank'> Learn more <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33357 14.1667C8.12023 14.1667 7.90687 14.0851 7.74437 13.9226C7.41854 13.5967 7.41854 13.07 7.74437 12.7442L10.4885 10L7.74437 7.25589C7.41854 6.93006 7.41854 6.40334 7.74437 6.0775C8.07021 5.75167 8.59693 5.75167 8.92276 6.0775L12.2561 9.41084C12.5819 9.73667 12.5819 10.2634 12.2561 10.5892L8.92276 13.9226C8.76026 14.0851 8.5469 14.1667 8.33357 14.1667Z" fill="#FA4E0E"/>
</svg></a>`,
  },
  {
    id: 2,
    title: 'Earn more BVM',
    description:
      'When you stake BVM, you’ll both mine SHARD and earn BVM with a 25% - 58% interest.',
    image: '/shard/shard_3.webp',
    bgColorImage: '#FFD73B',
    //     actionTitle: `Stake and earn up to 58% interest.<br/> <a href='https://nakachain.xyz/staking/dashboard' target='_blank'>Learn more <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <path d="M8.33357 14.1667C8.12023 14.1667 7.90687 14.0851 7.74437 13.9226C7.41854 13.5967 7.41854 13.07 7.74437 12.7442L10.4885 10L7.74437 7.25589C7.41854 6.93006 7.41854 6.40334 7.74437 6.0775C8.07021 5.75167 8.59693 5.75167 8.92276 6.0775L12.2561 9.41084C12.5819 9.73667 12.5819 10.2634 12.2561 10.5892L8.92276 13.9226C8.76026 14.0851 8.5469 14.1667 8.33357 14.1667Z" fill="#FA4E0E"/>
    // </svg></a>`,
    actionTitle: `Treasury <strong>50,000,000 BVM $treasuryValue</strong>.<br/> <a href='/bvm' target='_self'>Learn more <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33357 14.1667C8.12023 14.1667 7.90687 14.0851 7.74437 13.9226C7.41854 13.5967 7.41854 13.07 7.74437 12.7442L10.4885 10L7.74437 7.25589C7.41854 6.93006 7.41854 6.40334 7.74437 6.0775C8.07021 5.75167 8.59693 5.75167 8.92276 6.0775L12.2561 9.41084C12.5819 9.73667 12.5819 10.2634 12.2561 10.5892L8.92276 13.9226C8.76026 14.0851 8.5469 14.1667 8.33357 14.1667Z" fill="#FA4E0E"/>
</svg>
</a>`,
  },
  {
    id: 3,
    title: 'Get exclusive access to deal flow',
    description:
      'You’ll have exclusive access to new crypto deals and exclusive launchpad projects — just for you. We’ll set aside some allocation for you. That’s why it’s incredible to be a SHARD holder.',
    image: '/shard/shard_4.webp',
    bgColorImage: '#B3FFBF',
    //     actionTitle: `Upcoming deal: <strong>Up to 30% bonus token from Eternal AI public sale</strong>.<br/> <a href='https://nakachain.xyz/launchpad/detail/2' target='_blank'>Learn more <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <path d="M8.33357 14.1667C8.12023 14.1667 7.90687 14.0851 7.74437 13.9226C7.41854 13.5967 7.41854 13.07 7.74437 12.7442L10.4885 10L7.74437 7.25589C7.41854 6.93006 7.41854 6.40334 7.74437 6.0775C8.07021 5.75167 8.59693 5.75167 8.92276 6.0775L12.2561 9.41084C12.5819 9.73667 12.5819 10.2634 12.2561 10.5892L8.92276 13.9226C8.76026 14.0851 8.5469 14.1667 8.33357 14.1667Z" fill="#FA4E0E"/>
    // </svg></a>`,
    actionTitle: `Upcoming airdrop: <strong>SHARD holders are among recipients of the 50,000,000 $EAI airdrop program</strong>.<br/> <a href='https://eternalai.org/' target='_blank'> Learn more <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33357 14.1667C8.12023 14.1667 7.90687 14.0851 7.74437 13.9226C7.41854 13.5967 7.41854 13.07 7.74437 12.7442L10.4885 10L7.74437 7.25589C7.41854 6.93006 7.41854 6.40334 7.74437 6.0775C8.07021 5.75167 8.59693 5.75167 8.92276 6.0775L12.2561 9.41084C12.5819 9.73667 12.5819 10.2634 12.2561 10.5892L8.92276 13.9226C8.76026 14.0851 8.5469 14.1667 8.33357 14.1667Z" fill="#FA4E0E"/>
</svg></a>`,
  },
];

const Category = () => {
  const coinPrices = useSelector(commonSelector).coinPrices;
  const bvmPrice = useMemo(() => coinPrices?.['BVM'] || '0', [coinPrices]);

  return (
    <div className={`${s.cateWrapper}`}>
      {cardGameFiData.map((item, id) => {
        const treasuryValue = new BigNumberJS(50000000)
          .multipliedBy(bvmPrice)
          .toFixed(0);
        const data = {
          ...item,
          actionTitle:
            id === 0 || id === 2
              ? item.actionTitle.replace(
                  '$treasuryValue',
                  `($${formatCurrency(treasuryValue, 0, 0, 'BTC', true)})`,
                )
              : item.actionTitle,
        };
        return <CardFi key={id} {...data} />;
      })}
    </div>
  );
};
export default Category;
