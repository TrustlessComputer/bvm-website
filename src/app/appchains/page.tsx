import MainLayout from '@layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';
import React from 'react';
import ResolutionDetail from "@/modules/ResolutionDetail";
import {RESOLUTION_DATAS} from "@constants/solution-data";


const AppChains = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <>
        <Loader/>
        <ResolutionDetail data={RESOLUTION_DATAS.appchains}/>
      </>
    </MainLayout>
  );
}

export default AppChains
