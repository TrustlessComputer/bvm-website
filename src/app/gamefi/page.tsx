import GameFiModule from '@/modules/gamefi';
import MainLayout from '@/layouts/MainLayout';

const GameFiPage = () => {
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

export default GameFiPage;
