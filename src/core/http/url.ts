import qs from 'query-string';
import Config from 'react-native-config';

export type RecordQuery = Record<string, unknown>;

const url = (
  host: string | undefined,
  path: string,
  query?: Record<string, any>,
): string => qs.stringifyUrl({url: new URL(path, host).toString(), query});

export const baseUrl = (path: string, query?: RecordQuery): string =>
  url(Config.BASE_URL, path, query);
export default url;
