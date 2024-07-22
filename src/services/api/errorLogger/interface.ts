import { ERROR_LOGGER_LEVEL, ERROR_LOGGER_TYPE } from ".";

export interface IErrorLoggerPayload {
  address?: string;
  action: string | keyof typeof ERROR_LOGGER_TYPE;
  error: any;
  info?: any;
  extra?: any;
  level?: string | keyof typeof ERROR_LOGGER_LEVEL;
}
