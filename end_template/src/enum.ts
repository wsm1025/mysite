enum STATUSTYPE {
  ACTIVE = '0', // 启用
  INACTIVE = '1', // 禁用
}
enum PARENTTYPE {
  SON = '0',
  FATHRER = '1',
}
enum USERROLRTYPE {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

enum OPERATIONTYPE {
  USER_ADD = 'user_add',
  USER_EDIT = 'user_edit',
  USER_DELETE = 'user_delete',
  USER_LIST = 'user_list',

  DICTIONARY_ADD = 'dictionary_add',
  DICTIONARY_EDIT = 'dictionary_edit',
  DICTIONARY_DELETE = 'dictionary_delete',
  DICTIONARY_LIST = 'dictionary_list',

  MENU_ADD = 'menu_add',
  MENU_EDIT = 'menu_edit',
  MENU_DELETE = 'menu_delete',
  MENU_LIST = 'menu_list',
}
export { STATUSTYPE, PARENTTYPE, USERROLRTYPE, OPERATIONTYPE };
