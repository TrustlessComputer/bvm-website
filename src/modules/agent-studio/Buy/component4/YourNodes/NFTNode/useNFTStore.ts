import nftModuleStore from './nftModuleStore';

export const useNFTStore = () => {
  const storeData = nftModuleStore();
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
