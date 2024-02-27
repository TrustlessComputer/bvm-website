import MainLayout from '@/layouts/MainLayout';
import BitcoinL2S from '@/modules/BitcoinL2S';

const BitcoinL2SPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: 'white',
      }}
    >
      <BitcoinL2S />
    </MainLayout>
  );
}

export default BitcoinL2SPage;
