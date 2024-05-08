export const ERROR_CODE = {
  EXAMPLE: '-3000',
};

export const ERROR_MESSAGE = {
  [ERROR_CODE.EXAMPLE]: {
    message: 'Example error message',
    desc: 'Example error description',
  },
};

class WError extends Error {
  message: string;
  code: string;
  desc: string;
  constructor(code: string, desc?: string) {
    super();
    const _error = ERROR_MESSAGE[code];
    this.message = `${_error.message} (${code})` || '';
    this.code = code;
    this.desc = desc || _error?.desc;
  }
  getMessage() {
    return this.message;
  }
}

const parseEtherError = (error: unknown) => {
  let message = '';
  const reason = Object(error)?.reason;
  if (reason && typeof reason === 'string') {
    message = reason;
  }
  // @ts-ignore
  const body = error?.body;
  if (body && typeof body === 'string') {
    const bodyObject = JSON.parse(body);
    if (bodyObject?.error?.message) {
      message = bodyObject?.error?.message;
    }
  }
  return message;
};

export const getErrorMessage = (error: unknown, name: string = '') => {
  let message = 'Something went wrong. Please try again later.';
  let desc = '';
  if (error instanceof WError) {
    message = error.getMessage();
    desc = error.desc + `(${error.code})`;
  } else if (error instanceof Error && error.message) {
    message = error.message;
    desc = error.message;

    const etherError = parseEtherError(error);
    if (etherError) {
      message = etherError;
      desc = JSON.stringify(error);
    }
  } else if (typeof error === 'string') {
    message = error;
    desc = error;
  }

  return {
    message: `${message} ${name ? `[${name}]` : ''}`,
    desc: `${desc}`,
  };
};

export default WError;
