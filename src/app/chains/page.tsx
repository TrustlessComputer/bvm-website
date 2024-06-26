import MainLayout from '@layouts/MainLayout';
// import ChainsModule from '@/modules/Chains';
import ChainsModule from '@/modules/ChainsV2';
export default function Chains() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter={true}
    >
      <ChainsModule />
    </MainLayout>
  );
}
