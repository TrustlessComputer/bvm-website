import MainLayout from '@/layouts/MainLayout';
import AirdropModule from '@/modules/airdrop2';
import Loader from '@/modules/builder-landing/Loader';

const Airdrop2Page = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <Loader />

      <AirdropModule />
    </MainLayout>
  );
};

export default Airdrop2Page;
