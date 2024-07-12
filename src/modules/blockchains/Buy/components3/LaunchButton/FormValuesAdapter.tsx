export const formValuesAdapter = (
  dynamicFormValues: any[],
): IModelCategory[] => {
  const listWrapper =
    dynamicFormValues.map((item) => {
      let itemWrapper: IModelCategory;
      itemWrapper = {
        ...item,
        options: [item.value],
      };

      return itemWrapper;
    }) || [];

  return listWrapper;
};
