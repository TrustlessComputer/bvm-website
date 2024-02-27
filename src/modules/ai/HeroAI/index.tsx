import ContainerDiv from '@/components/Container';
import HeroFi from '@/components/HeroFI';

const heroAIData = [
  {
    id: 0,
    mainTitle: 'AI',
    title: 'Enable the deployment and execution of AI directly on the Bitcoin network.',
    subTitle: "Open doors to opportunities we've yet to imagine.",
    btnTitle: 'Create your own GameFi L2',
    subBtnTitle: 'Need an example? Explore Eternal AI now! ',
    subBtnIcon: '/icons/arrow-right.svg',
    heroThumbnail: '/ai/ai-hero.png',
    btnHref: '/blockchains/customize',
    subBtnIconHref: 'https://eternalai.org/',
  },
];

const HeroSection = () => {
  return (
    <ContainerDiv>
      {heroAIData.map((fiData, id) => {
        return <HeroFi key={id} {...fiData} />;
      })}
    </ContainerDiv>
  );
};
export default HeroSection;
