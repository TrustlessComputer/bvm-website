import s from './styles.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { Text } from '@chakra-ui/react';

const PartnersData = [
  {
    title: 'Polygon',
    image: '/partners/polygon.svg',
    alt: 'Polygon',
  },
  {
    title: 'FileCoin',
    image: '/partners/fileCoin.svg',
    alt: 'FileCoin',
  },
  {
    title: 'SysCoin',
    image: '/partners/syscoin.svg',
    alt: 'SysCoin',
  },
  {
    title: 'ZKSync',
    image: '/partners/zksync.svg',
    alt: 'Zksync',
  },
  {
    title: 'Bitcoin Stamps',
    image: '/partners/stamp.svg',
    alt: 'Bitcoin Stamps',
  },
  {
    title: 'Near',
    image: '/partners/near.svg',
    alt: 'Near',
  },
  // {
  //   title: 'Arweave',
  //   image: '/partners/arweave.svg',
  //   alt: 'Arweave',
  // },
  // {
  //   title: 'Jackal',
  //   image: '/partners/jackal.svg',
  //   alt: 'Jackal',
  // },
  // {
  //   title: 'Bitcoin',
  //   image: '/partners/bitcoin.svg',
  //   alt: 'Bitcoin',
  // },
  // {
  //   title: 'Optimism',
  //   image: '/partners/optimism.svg',
  //   alt: 'Optimism',
  // },
  {
    title: 'Celestia',
    image: '/partners/celestia.svg',
    alt: 'Celestia',
  },
  {
    title: 'Supra',
    image: '/partners/supra.svg',
    alt: 'Supra',
  },
  {
    title: 'Eigen',
    image: '/partners/eigen.svg',
    alt: 'Eigen',
  },
  {
    title: 'OKX Web3',
    image: '/partners/okx.svg',
    alt: 'Okx',
  },
  // {
  //   title: 'Uniswap',
  //   image: '/partners/uniswap.svg',
  //   alt: 'Uniswap',
  // },
  // {
  //   title: 'Ordinals',
  //   image: '/partners/ordinals.svg',
  //   alt: 'Ordinals',
  // }
];

function Partners() {
  return (
    <div className={`container`}>
      <div className={`${s.section}`}>
        <Text
          fontSize={['28px', '24px']}
          lineHeight={{ base: '140%', md: '120%' }}
          fontWeight={500}
          color={'#000'}
          textAlign={'center'}
          textTransform={'uppercase'}
          className={s.heading}
        >
          Partners
        </Text>
        <div className={s.wrapper}>
          {PartnersData.map((item: any) => {
            return (
              <a target="_blank" href={item?.link} className={s.item}>
                <div className={s.itemImage}>
                  <ImagePlaceholder
                    src={item.image}
                    alt={item.alt}
                    width={10}
                    height={10}
                  />
                </div>
                <p className={s.itemLabel}>{item.title}</p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Partners;
