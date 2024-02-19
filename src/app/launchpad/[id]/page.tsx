import MainLayout from '@/layouts/MainLayout';
import LaunchpadDetailModule from '@/modules/Launchpad';

const LaunchpadDetailPage = () => {
  return (
    <MainLayout
      headerProps={{bgColor: '#0E0E0E'}}
    >
      <LaunchpadDetailModule />
    </MainLayout>
  );
};

export default LaunchpadDetailPage;
