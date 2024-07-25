import { compareString } from '@utils/string';


interface IFieldValue {
  [key: string]: any
}

interface ParseResult {
  dappKey: string;
  fieldValue: IFieldValue
}

const getValue = (item: FieldModel) => {
  return item.type === 'extends'
    ? Boolean(item.value)
    : item.value;
}

const parseDappModel = (params: { model: DappModel[], key: string }): ParseResult => {
  const { model, key } = params;
  const data = model.filter(item => compareString(item.key, key) || compareString(item.id, key));

  const result = data.reduce((prev, curr, index) => {
    // console.log('SANG TEST: prev, curr', {
    //   prev, curr
    // });

    const baseField = (curr.baseBlock?.fields || []).reduce((prevBase, currBase) => {
      return {
        ...prevBase,
        [`${index}-base-${currBase.key}-${currBase?.level || 0}`]: currBase.value
      }
    }, {}) as IFieldValue;

    let options = {};

    const blockField = (curr.blockFields || []).reduce(
      (prevField, currField, indexField) => {
      const blockItem = currField.fields.reduce((prevItem, currItem) => {
        if (currItem.type === 'extends') {
          currItem.options.forEach(item1 => {
            item1?.options.forEach(item2  => {
              options = {
                ...options,
                [`${index}-block-${item2.key}-${item2?.level || 0}-${indexField}-${currField.key}`]: getValue(item2)
              }
            })
          })
        }

        return {
          ...prevItem,
          [`${index}-block-${currItem.key}-${currItem?.level || 0}-${indexField}-${currField.key}`]: getValue(currItem),
        }
      }, {});

      return {
        ...prevField,
        ...blockItem,
      }
    }, {});

    const mapper = {
      ...prev,
      fieldValue: {
        ...prev.fieldValue,
        ...baseField,
        ...blockField,
        ...options
      }
    }
    return mapper
  }, {
    dappKey: key,
    fieldValue: {}
  } as ParseResult) as ParseResult;

  return result;
};

export {
  parseDappModel
}
