import React from 'react';
import MainLayout from '@layouts/MainLayout';
import ModulesPage from '@/modules/ModulesPage';


const Modules = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        // colorLogo: 'white'
      }}
      hideFooter={true}
    >
      <ModulesPage/>
    </MainLayout>
  )
}

export default Modules
