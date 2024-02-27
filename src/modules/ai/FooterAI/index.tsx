import ContainerDiv from '@/components/Container';
import FooterFi from '@/components/FooterFi';

const footerAIData = [
  {
    id: 0,
    fTitle: 'It’s a safe and reliable way for everyone to use advanced AI.',
    sTitle: '',
    description: 'Build unstoppable AI',
    image: '/ai/eternal_ai.png',
    thumbnail: '/ai/eternal_thumbnail.png',
    btnTitle: 'Need an example? Explore Bitcoin Arcade now!',
    endFooter: 'Powered by Bitcoin Virtual Machine',
  },
];

const FooterAI = () => {
  return (
    <ContainerDiv>
      {footerAIData.map((fiData, id) => {
        return <FooterFi key={id} {...fiData} />;
      })}
    </ContainerDiv>
  );
}

export default FooterAI;
