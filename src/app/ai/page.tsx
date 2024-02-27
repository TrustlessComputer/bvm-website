import AIPage from '@/modules/AI';
import GameFiModule from '@/modules/gamefi';
import MainLayout from '@/layouts/MainLayout';

export default function AI() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <AIPage/>
    </MainLayout>
  )
}
