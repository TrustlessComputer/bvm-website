import ContainerDiv from '@/components/Container';
import HeroFi from '@/components/HeroFI';

const heroGameFiData = [
  {
    id: 0,
    mainTitle: 'DeFi',
    title: 'Making DeFi on Bitcoin possible and accessible to everyone',
    subTitle: `Unlocking Bitcoin's $250B treasury chest`,
    btnTitle: 'Create your own DeFi L2',
    subBtnTitle: 'Need an example? Explore Bitcoin Arcade now!',
    subBtnIcon: '/icons/arrow-right.svg',
    heroThumbnail: '/defi/compress/deFi_hero.png',
    btnHref: '#',
    subBtnIconHref: '#',
  },
];

const HeroSection = () => {
  return (
    <ContainerDiv>
      {heroGameFiData.map((fiData, id) => {
        return <HeroFi key={id} {...fiData} />;
      })}
    </ContainerDiv>
  );
};
export default HeroSection;
