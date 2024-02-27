import ContainerDiv from '@/components/Container';
import HeroFi from '@/components/HeroFI';

const heroGameFiData = [
  {
    id: 0,
    mainTitle: 'GameFi',
    title: 'Designed for Game builders',
    subTitle: 'Shaping the Future of Gaming on Bitcoin',
    btnTitle: 'Create your own GameFi L2',
    subBtnTitle: 'Need an example? Explore Bitcoin Arcade now!',
    subBtnIcon: '/icons/arrow-right.svg',
    heroThumbnail: '/gamefi/compress/gamefi_hero.png',
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
