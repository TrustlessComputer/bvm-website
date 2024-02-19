import MainLayout from '@/layouts/MainLayout';
import LaunchpadDetailModule from '@/modules/Launchpad';

const LaunchpadDetailPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <LaunchpadDetailModule />
    </MainLayout>
  );
};

export default LaunchpadDetailPage;
