import MainLayout from '@/layouts/MainLayout';
import UpcomingModule from '@/modules/airdrop';

const Airdrop2Page = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <UpcomingModule />
    </MainLayout>
  );
};

export default Airdrop2Page;
