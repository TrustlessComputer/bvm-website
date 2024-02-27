import CardFi from '@/components/CardFi';
import ContainerDiv from '@/components/Container';
import s from '@/modules/gamefi/CategorySection/style.module.scss';

const cardDeFiData = [
  {
    id: 0,
    title: 'Enhance DeFi Efficiency',
    description:
      "With a 2-second block time and transaction costs of less than $0.001, it is substantially faster and cheaper than Bitcoin's mainnet, providing great efficiency.",
    image: '/defi/compress/DeFi_1.png',
    bgColorImage: '#35CCA6',
  },
  {
    id: 1,
    title: 'Zero effort to migrate from Ethereum',
    description:
      'It enables developers to transfer dApps from Ethereum to Bitcoin with little or no change.',
    image: '/defi/compress/DeFi_2.png',
    bgColorImage: '#459443',
  },
  {
    id: 2,
    title: 'Flexible Gas Fee Options:',
    description:
      'Enjoy the flexibility of paying gas fees in either Bitcoin or your native tokens',
    image: '/defi/compress/DeFi_3.png',
    bgColorImage: '#74C9E4',
  },
];

const CategorySection = () => {
  return (
    <ContainerDiv>
      <div className={`${s.cateWrapper}`}>
        {cardDeFiData.map((item, id) => {
          return <CardFi key={id} {...item} />;
        })}
      </div>
    </ContainerDiv>
  );
};
export default CategorySection;
