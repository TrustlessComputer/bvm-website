import MainLayout from '@/layouts/MainLayout';
import UpcomingModule from '@/modules/upcoming';

const UpcomingPage = () => {
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

export default UpcomingPage;
