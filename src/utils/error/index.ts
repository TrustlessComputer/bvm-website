export enum ErrorMessage {
  DEFAULT = 'Oops. Something went wrong. Please try again later.',
}

const isObject = (value: unknown) => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
};

export interface IError {
  message: string;
  code: number;
}

const getError = (err: unknown): IError => {
  const randomCode = Math.floor(Math.random() * 100);
  let _err: IError;
  if (typeof err === 'string') {
    _err = {
      message: err,
      code: randomCode,
    };
  } else if (
    !!err &&
    typeof err === 'object' &&
    'message' in err &&
    typeof err.message === 'string'
  ) {
    const errCode =
      'code' in err &&
      (typeof err.code === 'number' || typeof err.code === 'string')
        ? err.code
        : randomCode;
    _err = {
      message: err.message,
      code: Number(errCode),
    };
  } else {
    _err = {
      message: JSON.stringify(err || ErrorMessage.DEFAULT),
      code: randomCode,
    };
  }
  return _err;
};

export { isObject, getError };
