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
  USER_ONE = 'user_one',

  DICTIONARY_ADD = 'dictionary_add',
  DICTIONARY_EDIT = 'dictionary_edit',
  DICTIONARY_DELETE = 'dictionary_delete',
  DICTIONARY_LIST = 'dictionary_list',

  MENU_ADD = 'menu_add',
  MENU_EDIT = 'menu_edit',
  MENU_DELETE = 'menu_delete',
  MENU_LIST = 'menu_list',
}

enum OPERATIONTYPETEXT {
  USER_ADD = '新增用户',
  USER_EDIT = '编辑用户',
  USER_DELETE = '删除用户',
  USER_LIST = '用户列表',
  USER_ONE = '单个用户',

  DICTIONARY_ADD = '新增字典',
  DICTIONARY_EDIT = '编辑字典',
  DICTIONARY_DELETE = '删除字典',
  DICTIONARY_LIST = '字典列表',

  MENU_ADD = '新增菜单',
  MENU_EDIT = '编辑菜单',
  MENU_DELETE = '删除菜单',
  MENU_LIST = '菜单列表',
}

enum COMMONTYPE {
  IP = 'ip',
  SQL = 'sql',
  UPLOADFILE = 'uploadFile',
  OTHER = 'other',
}

export {
  STATUSTYPE,
  PARENTTYPE,
  USERROLRTYPE,
  OPERATIONTYPE,
  OPERATIONTYPETEXT,
  COMMONTYPE,
};
