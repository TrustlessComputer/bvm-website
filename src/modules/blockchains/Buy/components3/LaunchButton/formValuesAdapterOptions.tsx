import { useOptionInputStore } from '../../component4/DappRenderer/OptionInputValue/useOptionInputStore';

export const formValuesAdapterOptions = (dynamicForm: any[]) => {
  const { getValue } = useOptionInputStore();

  let mapper: any = [];

  dynamicForm.map((item) => {
    const itemClone = { ...item };
    let optionsNew: any[] = [];

    itemClone.options?.map((currentOption: any) => {
      const optionKey = currentOption?.key;
      const valueInputBasedKey = getValue(optionKey);
      if (valueInputBasedKey) {
        let optionClone = { ...currentOption };
        let addOnInputs = {
          ...currentOption.addOnInputs,
          attrs: {
            ...currentOption.addOnInputs.attrs,
            value: valueInputBasedKey?.value || '',
          },
        };
        optionClone.addOnInputs = addOnInputs;
        optionsNew.push(optionClone);
      } else {
        optionsNew.push(currentOption);
      }
    });

    itemClone.options = optionsNew;

    mapper.push(itemClone);
  });

  // console.log('Before: AdapterOptions ---  ', dynamicForm);
  // console.log('Before: AdapterOptions.length---  ', dynamicForm?.length);

  // console.log('After: AdapterOptions ---  ', mapper);
  // console.log('After: AdapterOptions.length---  ', mapper?.length);

  return mapper;
};
