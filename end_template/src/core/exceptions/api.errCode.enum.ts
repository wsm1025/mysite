/**
 * @description 自定义业务状态码
 */
export enum ApiErrCode {
  /** 成功 */
  SUCCESS = 200,
  /** 用户未登录 */
  NOT_LOGIN = 10000,
  /** 用户已存在 */
  USER_EXIST = 10001,
  /** 用户不存在 */
  USER_NOT_EXIST = 10002,
  /** 密码错误 */
  PASSWORD_ERROR = 10003,
  /** 权限不足 */
  NO_PERMISSIN = 10011,
  /** 数据字典存在重复数据 */
  DICTIONARY_EXIST = 10013,
}

const apiErrMsgMap = {
  [ApiErrCode.SUCCESS]: '成功',
  [ApiErrCode.NOT_LOGIN]: '用户未登录',
  [ApiErrCode.USER_EXIST]: '用户密码错误或者用户已存在',
  [ApiErrCode.USER_NOT_EXIST]: '用户不存在',
  [ApiErrCode.PASSWORD_ERROR]: '密码错误',
  [ApiErrCode.NO_PERMISSIN]: '权限不足',
  [ApiErrCode.DICTIONARY_EXIST]: '数据字典存在重复数据',
};

export { apiErrMsgMap };
