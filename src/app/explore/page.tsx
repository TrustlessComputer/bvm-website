import { Metadata } from 'next';
import MainLayout from '@layouts/MainLayout';
import ExploreModule from '@/modules/ExploreModule';


export const metadata: Metadata = {
  title: 'Explore',
}


export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        colorLogo: 'black',
        bgColor: 'transparent',
        position: 'absolute',
        // showBanner: true,
      }}
    >
      <ExploreModule />
    </MainLayout>
  )
}
