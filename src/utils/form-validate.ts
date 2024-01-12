import { reduce } from "lodash";

export const composeValidators =
  (...validators: any[]) =>
  (value: unknown, values: unknown, props: any) =>
    reduce(
      validators,
      (error, validator) => error || validator(value, values, props),
      undefined
    );

export const required = (value: unknown) => (value ? undefined : "Required");

export const containsOnlySpaces = (str: string) => {
  return str.trim().length === 0;
};
