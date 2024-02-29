import MainLayout from '@/layouts/MainLayout';
import AirdropModule from '@/modules/airdrop2';

const Airdrop2Page = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <AirdropModule />
    </MainLayout>
  );
};

export default Airdrop2Page;
