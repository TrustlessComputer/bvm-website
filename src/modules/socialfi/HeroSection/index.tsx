import HeroFi from '@/components/HeroFI';

const heroGameFiData = [
  {
    id: 0,
    mainTitle: 'SocialFi',
    title: 'Connect, hang out, have fun, and earn.',
    subTitle: 'Optimized for content creators.',
    btnTitle: 'Create your own SocialFi L2',
    subBtnTitle: 'Need an example? Explore Alpha now!',
    subBtnIcon: '/icons/arrow-right.svg',
    heroThumbnail: '/socialfi/compress/socialfi_hero.png',
    btnHref: '#',
    subBtnIconHref: '#',
  },
];

const HeroSection = () => {
  return (
    <>
      {heroGameFiData.map((fiData, id) => {
        return <HeroFi key={id} {...fiData} />;
      })}
    </>
  );
};
export default HeroSection;
