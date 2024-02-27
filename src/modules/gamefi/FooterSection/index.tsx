import FooterFi from "@/components/FooterFi";

const footerGameFiData = [
  {
    id: 0,
    fTitle: 'Ushering the new golden era of ',
    sTitle: 'Gaming on Bitcoin',
    description: 'The first ever fully on-chain gaming blockchain on Bitcoin',
    image: '/gamefi/compress/arcade_gamefi.svg',
    thumbnail: '/gamefi/compress/banner_public_sale.png',
    btnTitle: 'Need an example? Explore Bitcoin Arcade now!',
    endFooter: 'Powered by Bitcoin Virtual Machine',
    href: '#',
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
};

export default FooterSection;
