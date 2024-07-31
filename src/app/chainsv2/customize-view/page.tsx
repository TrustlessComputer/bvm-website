import MainLayout from '@layouts/MainLayout';
import CustomViewModule from '@/modules/customViewModule';


export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideHeader={true}
      isHeaderCustom
      hideFooter={true}
      bodyColor={'#f3f1e8'}
    >
      <CustomViewModule />
    </MainLayout>
  )
}
