import { DappModel, FieldModel } from '@/types/customize-model';
import { compareString } from '@utils/string';

interface IFieldValue {
  [key: string]: any;
}

interface ParseResult {
  dappKey: string;
  fieldValue: IFieldValue;
}

const getValue = (item: FieldModel) => {
  return item.type === 'extends' ? Boolean(item.value) : item.value;
};

const parseDappModel = (params: {
  model: DappModel[];
  key: string;
  startIndex?: number;
}): ParseResult => {
  const { model, key } = params;
  let { startIndex = 0 } = params;

  const data = (model || []).filter(
    (item) => compareString(item.key, key) || compareString(item.id, key),
  );

  const getAllKeyValue = (fields: FieldModel[]) => {
    const result: Record<
      string,
      {
        value: any;
        level: number;
      }
    > = {};

    const loop = (options: FieldModel[], level: number) => {
      for (const option of options) {
        if (option.type === '') continue;

        result[option.key] = {
          value: option.value,
          level: level,
        };

        loop(option.options, level + 1);
      }
    };

    fields.forEach((item) => {
      if (item.type === 'input') {
        result[item.key] = {
          value: item.value,
          level: item.level || 0,
        };
      } else {
        if (item.type === 'extends') {
          result[item.key] = {
            value: item.value,
            level: item.level || 0,
          };
        }

        loop(item.options, item.level || 0);
      }
    });

    return result;
  };

  const result = data.reduce(
    (prev, curr) => {
      const index = startIndex;

      const baseField = (curr.baseBlock?.fields || []).reduce(
        (prevBase, currBase) => {
          return {
            ...prevBase,
            [`${index}-base-${currBase.key}-${currBase?.level || 0}`]:
              currBase.value,
          };
        },
        {},
      ) as IFieldValue;

      let options = {};
      const blockField = (curr.blockFields || []).reduce(
        (prevField, currField, indexField) => {
          const fields = currField.fields.reduce((prevItem, currItem) => {
            if (currItem.type === 'extends') {
              currItem.options.forEach((item1) => {
                item1?.options.forEach((item2) => {
                  options = {
                    ...options,
                    [`${index}-block-${item2.key}-${
                      item2?.level || 0
                    }-${indexField}-${currField.key}`]: getValue(item2),
                  };
                });
              });
            }

            return {
              ...prevItem,
              [`${index}-block-${currItem.key}-${
                currItem?.level || 0
              }-${indexField}-${currField.key}`]: getValue(currItem),
            };
          }, {});

          let childrenFields = {};
          const allChildrenKeyValue = getAllKeyValue(
            currField.childrenFields || [],
          );
          for (const [key, data] of Object.entries(allChildrenKeyValue)) {
            childrenFields = {
              ...childrenFields,
              [`${index}-block-${key}-${data.level}-${indexField}-${currField.key}`]:
                data.value,
            };
          }

          return {
            ...prevField,
            ...fields,
            ...childrenFields,
          };
        },
        {},
      );

      const mapper = {
        ...prev,
        fieldValue: {
          ...prev.fieldValue,
          ...baseField,
          ...blockField,
          ...options,
        },
      };

      startIndex++;

      return mapper;
    },
    {
      dappKey: key,
      fieldValue: {},
    } as ParseResult,
  ) as ParseResult;

  return result;
};

export { parseDappModel };
