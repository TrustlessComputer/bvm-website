import MainLayout from '@/layouts/MainLayout';
import AiLandingModule from '@/modules/aiLandingModule';

const AiModule = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
      }}
    >
      <AiLandingModule />
    </MainLayout>
  );
};

export default AiModule;
