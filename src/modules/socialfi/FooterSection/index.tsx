import FooterFi from '@/components/FooterFi';

const footerGameFiData = [
  {
    id: 0,
    fTitle: 'The first social app on Bitcoin.',
    description: '$2.7M paid to creators as of today.',
    image: '/socialfi/compress/alpha.svg',
    thumbnail: '/socialfi/compress/banner_public_sale.png',
    btnTitle: 'Need an example? Explore Alpha now!',
    endFooter: 'Powered by Bitcoin Virtual Machine',
    href:'https://alpha.wtf/'
  },
];

const FooterSection = () => {
  return (
    <>
      {footerGameFiData.map((fiData, id) => {
        return <FooterFi key={id} {...fiData} />;
      })}
    </>
  );
}

export default FooterSection;
