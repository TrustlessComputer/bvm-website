import '@fontsource/advent-pro';

import MainLayout from '@/layouts/MainLayout';
import MagaModule from '@/modules/maga';

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
        colorLogo: 'white',
        bgColor: 'black',
        position: 'absolute',
      }}
      hideFooter={true}
    >
      <MagaModule />
    </MainLayout>
  );
}
