import FooterFi from "@/components/FooterFi";

const footerDeFiData = [
  {
    id: 0,
    fTitle: 'Making DeFi on Bitcoin possible and accessible to everyone',
    image: '/defi/compress/naka_logo.svg',
    thumbnail: '/defi/compress/naka_thumbnail.png',
    btnTitle: 'Need an example? Explore Nakachain now!',
    endFooter: 'Powered by Bitcoin Virtual Machine',
    href: '#',
  },
];

const FooterSection = () => {
  return (
    <>
      {footerDeFiData.map((fiData, id) => {
        return <FooterFi key={id} {...fiData} />;
      })}
    </>
  );
};

export default FooterSection;
