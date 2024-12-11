import generalIdeaStore from './generalIdeaStore';

export const useGeneralIdeaStore = () => {
  const storeData = generalIdeaStore();
  const { setLoading, setStepper, setTextArea } = storeData;

  //More methods customize here!

  const resetData = async () => {
    setLoading(false);
    setStepper(1);
    setTextArea('');
  };

  return {
    ...storeData,
    resetData,
  };
};
