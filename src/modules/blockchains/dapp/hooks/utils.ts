import { FormDappUtil } from '@/modules/blockchains/dapp/utils';

export function extractedValue(
  keys: string[],
  data: Record<string, any>,
  result: Record<string, { key: string; value: string }[]>,
) {
  for (const key of keys) {
    const blockKey = FormDappUtil.getBlockKey(key);
    const getOriginalKey = FormDappUtil.getOriginalKey(key);
    const getIndex = FormDappUtil.getIndex(key);
    const value = data[key];

    if (blockKey) {
      let block = result[blockKey];
      if (!block) {
        result[blockKey] = [];
      }

      const blockItem = result[blockKey][getIndex];
      if (!blockItem) {
        const temp = {};
        // @ts-ignore
        temp[getOriginalKey] = value;
        // @ts-ignore
        result[blockKey][getIndex] = { ...temp };
      } else {
        const temp = { ...blockItem };
        // @ts-ignore
        temp[getOriginalKey] = value;
        result[blockKey][getIndex] = { ...temp };
      }
    } else {
      result[getOriginalKey] = value;
    }
  }

  return result;
}
