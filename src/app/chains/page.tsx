import MainLayout from '@layouts/MainLayout';
import ChainsModule from '@/modules/Chains';


export default function Chains() {
  return  (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter={true}
    >
      <ChainsModule />
    </MainLayout>
  )
}
