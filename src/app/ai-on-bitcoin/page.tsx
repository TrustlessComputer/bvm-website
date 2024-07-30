import MainLayout from '@/layouts/MainLayout';
import AiLandingModule from '@/modules/aiLandingModule';

const AiModule = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#fff',
      }}
    >
      <AiLandingModule />
    </MainLayout>
  );
};

export default AiModule;
