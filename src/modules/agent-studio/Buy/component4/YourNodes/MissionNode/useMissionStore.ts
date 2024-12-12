import missionModuleStore from './missionModuleStore';

export const useMissionStore = () => {
  const storeData = missionModuleStore();
  const {
    setLoading,
    setStepper,
    setDescripiton,
    setModel,
    setTime,
    setSocialSelected,
    setPersonalityStr,
    stepper,
  } = storeData;

  //More methods customize here!

  const resetData = async () => {
    setLoading(false);
    setStepper(1);
    setDescripiton('');
    setModel('');
    setTime(undefined);
    setSocialSelected(undefined);
    setPersonalityStr('');
  };

  return {
    ...storeData,
    resetData,
  };
};
