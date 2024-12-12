import React from 'react';

import { useParams, usePathname } from 'next/navigation';
import {
  createAgentGeneralIdeaAsBrainstorm,
  createAgentNftEtherAsBrainstorm,
  createAgentNftOrdinalBTCAsBrainstorm,
  createAgentTokensPumpAsBrainstorm,
  dappMockupData,
  missionAsBrainstorm,
} from '../mockup_3';
import useDappsStore from '../stores/useDappStore';
import { cloneDeep } from '../utils';

const useOnlyFetchDapp = () => {
  const pathname = usePathname();
  const params = useParams();
  const isUpdateChain = React.useMemo(() => !!params?.id, [params?.id]);

  const setDapps = useDappsStore((state) => state.setDapps);

  const fetchDapps = () => {
    const _dapps = [
      createAgentGeneralIdeaAsBrainstorm,
      createAgentNftEtherAsBrainstorm,
      createAgentNftOrdinalBTCAsBrainstorm,
      createAgentTokensPumpAsBrainstorm,
      missionAsBrainstorm,
    ];

    const otherDapps = isUpdateChain
      ? // ? cloneDeep(dappFromAPIMockupData)
        cloneDeep([])
      : cloneDeep(dappMockupData); // defi_apps

    _dapps.push(...otherDapps);

    let sortedDapps = _dapps.sort((a, b) => a.order - b.order);

    setDapps(sortedDapps);

    console.log('[useOnlyFetchDapp] dapps', sortedDapps);
  };

  React.useEffect(() => {
    fetchDapps();
  }, [pathname]);
};

export default useOnlyFetchDapp;
