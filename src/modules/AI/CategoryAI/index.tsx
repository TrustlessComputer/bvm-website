import CardFi from '@/components/CardFi';
import ContainerDiv from '@/components/Container';
import s from '@/modules/gamefi/CategorySection/style.module.scss';

const cardAIData = [
  {
    id: 0,
    title: 'Fully on-chain AI',
    description: "Traditional AI models, which are limited by their size and computational requirements, may now operate seamlessly on the blockchain. This technological breakthrough isn't just about bringing AI to Bitcoin; it's about redefining what's possible and transforming the way we build AI and interact with it in our daily lives.",
    image: '/ai/ai1.png',
    bgColorImage: '#35cca6',
  },
  {
    id: 1,
    title: 'Smart AI',
    description:
      'BVM is EVM-equivalent. It allows smart contract developers to code their neural networks with Solidity and helps developers save time to market by reusing battle-tested smart contract libraries for AI.',
    image: '/ai/ai2.png',
    bgColorImage: '#459443',
  },
  {
    id: 2,
    title: 'Composable AI',
    description:
      'Smart contract developers can now integrate AI smart contracts into their decentralized applications. This goes beyond simply referencing smart contracts; it involves embedding AI directly into decentralized applications in a trustless manner.',
    image: '/ai/ai3.png',
    bgColorImage: '#74c9e4',
  },
];

const CategoryAI = () => {
  return (
    <ContainerDiv>
      <div className={`${s.cateWrapper}`}>
        {cardAIData.map((item, id) => {
          return <CardFi key={id} {...item} />;
        })}
      </div>
    </ContainerDiv>
  );
};
export default CategoryAI;
