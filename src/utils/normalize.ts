import _camelCase from 'lodash/camelCase';
import _snakeCase from 'lodash/snakeCase';

export const camelCaseKeys = <T>(obj: Record<string, any>): T => {
  if (Array.isArray(obj)) {
    return obj.map((v: Record<string, any>) => camelCaseKeys<T>(v)) as T;
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_camelCase(key)]: camelCaseKeys<T>(obj[key] as Record<string, any>),
      }),
      {},
    ) as T;
  }
  return obj as T;
};

export const snakeCaseKeys = <T>(obj: Record<string, any>): T => {
  if (Array.isArray(obj)) {
    return obj.map((v: Record<string, any>) => snakeCaseKeys<T>(v)) as T;
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_snakeCase(key)]: snakeCaseKeys<T>(obj[key] as Record<string, any>),
      }),
      {},
    ) as T;
  }
  return obj as T;
};
