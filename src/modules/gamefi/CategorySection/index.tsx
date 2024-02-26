import CardFi from '@/components/CardFi';
import s from './style.module.scss';

const cardGameFiData = [
  {
    id: 0,
    title: 'Unlock unparalleled performance',
    description:
      'Experience lightning-fast 2-second block times and ultra-low gas fees (less than $0.001 per transaction).',
    image: '/gamefi/GameFi_1.png',
    bgColorImage: '#35cca6',
  },
  {
    id: 1,
    title: 'Migrate games seamlessly',
    description:
      'Effortlessly transition existing games from EVM-compatible chains like Ethereum, BSC, or Fantom to your new Bitcoin L2 without the need for a new toolkit.',
    image: '/gamefi/GameFi_2.png',
    bgColorImage: '#459443',
  },
  {
    id: 2,
    title: 'Enhance Scalability and Security',
    description:
      'Leverage optimistic rollup technology for massive scalability and Bitcoin-grade security.',
    image: '/gamefi/GameFi_3.png',
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
