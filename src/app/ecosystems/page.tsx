import MainLayout from '@layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';
import DeFiModule from '@/modules/defi';
import React from 'react';
import EcosystemsModule from '@/modules/ecosystemsModule';
import {RESOLUTION_DATAS} from "@constants/solution-data";
import ResolutionDetail from "@/modules/ResolutionDetail";


const Ecosystems = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter
    >
      <>
        <Loader />
        <ResolutionDetail data={RESOLUTION_DATAS.ecosystem} />
      </>
    </MainLayout>
  );
}

export default Ecosystems
