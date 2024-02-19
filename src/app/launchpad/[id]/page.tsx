import MainLayout from '@/layouts/MainLayout';
import LaunchpadDetailModule from '@/modules/Launchpad';
import { LaunchpadProvider } from '@/Providers/LaunchpadProvider';

const LaunchpadDetailPage = () => {
  return (
    <MainLayout
      headerProps={{bgColor: '#0E0E0E'}}
    >
      <LaunchpadProvider>
        <LaunchpadDetailModule />
      </LaunchpadProvider>
    </MainLayout>
  );
};

export default LaunchpadDetailPage;
