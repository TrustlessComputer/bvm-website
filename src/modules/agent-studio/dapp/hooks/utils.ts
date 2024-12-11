import { FormDappUtil } from '@/modules/blockchains/dapp/utils';

export function extractedValue(
  keys: string[],
  data: Record<string, any>,
  result: Record<string, { key: string; value: string }[]>[],
) {
  for (const key of keys) {
    const getBaseIndex = FormDappUtil.getBaseIndex(key);
    const blockKey = FormDappUtil.getBlockKey(key);
    const getOriginalKey = FormDappUtil.getOriginalKey(key);
    const getIndex = FormDappUtil.getIndex(key);
    const value = data[key];

    let base = result[getBaseIndex];
    if(!base) {
      result[getBaseIndex] = {};
      base = result[getBaseIndex];
    }

    // console.log('getBaseIndex', getBaseIndex)
    // console.log('getOriginalKey', getOriginalKey)
    // console.log('blockKey', blockKey)
    // console.log('getIndex', getIndex)
    // console.log('value', value)
    // console.log('=======')

    if (blockKey) {
      const block = base[blockKey];

      if (!block) {
        base[blockKey] = [];
      }

      const blockItem = base[blockKey][getIndex];
      if (!blockItem) {
        const temp = {};
        // @ts-ignore
        temp[getOriginalKey] = value;
        // @ts-ignore
        base[blockKey][getIndex] = { ...temp };
      } else {
        const temp = { ...blockItem };
        // @ts-ignore
        temp[getOriginalKey] = value;
        base[blockKey][getIndex] = { ...temp };
      }
    } else {
      base[getOriginalKey] = value;
    }
  }

  return result;
}
