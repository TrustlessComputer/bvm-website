import MainLayout from '@/layouts/MainLayout';
import AIModule from '@/modules/ai';
import Loader from '@/modules/builder-landing/Loader';

const AiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <>
        <Loader />
        <AIModule />
      </>
    </MainLayout>
  );
};

export default AiPage;
