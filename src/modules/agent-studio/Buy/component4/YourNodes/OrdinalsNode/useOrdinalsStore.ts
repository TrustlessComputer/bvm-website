import ordinalsModuleStore from './ordinalsModuleStore';

export const useOrdinalsStore = () => {
  const storeData = ordinalsModuleStore();
  const {
    setLoading,
    setStepper,
    setCollectionStr,
    setTokenIdStr,
    setPersonalityStr,
  } = storeData;

  //More methods customize here!

  const resetData = async () => {
    setLoading(false);
    setStepper(1);
    setCollectionStr('');
    setTokenIdStr('');
    setPersonalityStr('');
  };

  return {
    ...storeData,
    resetData,
  };
};
