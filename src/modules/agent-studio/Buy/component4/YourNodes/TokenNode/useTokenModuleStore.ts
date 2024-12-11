import tokenModuleStore from './tokenModuleStore';

export const useTokenModuleStore = () => {
  const storeData = tokenModuleStore();
  const {
    setLoading,
    setStepper,
    setContractAddressStr,
    setTokenNameStr,
    setTokenSymbolStr,
    setPersonalityStr,
  } = storeData;

  //More methods customize here!

  const resetData = async () => {
    setLoading(false);
    setStepper(1);
    setContractAddressStr('');
    setTokenNameStr('');
    setTokenSymbolStr('');
    setPersonalityStr('');
  };

  return {
    ...storeData,
    resetData,
  };
};
