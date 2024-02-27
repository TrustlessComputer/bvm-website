import MainLayout from '@/layouts/MainLayout';
import AIModule from '@/modules/ai';

const AiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <AIModule />
    </MainLayout>
  );
};

export default AiPage;
