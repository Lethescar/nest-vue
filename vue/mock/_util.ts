// Interface data format used to return a unified format

export function resultSuccess<T = Recordable>(data: T, { msg = 'ok' } = {}) {
  return {
    code: 0,
    data,
    msg,
    success: true,
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { msg = 'ok' } = {},
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      records: pageData,
      total: list.length,
    }),
    msg,
  };
}

export function resultError(msg = 'Request failed', { code = -1, data = null } = {}) {
  return {
    code,
    data,
    msg,
    success: false,
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}
