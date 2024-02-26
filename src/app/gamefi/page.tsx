import GameFiModule from '@/modules/gamefi';
import MainLayout from '@/layouts/MainLayout';

const UpcomingPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <GameFiModule />
    </MainLayout>
  );

};

export default UpcomingPage;
