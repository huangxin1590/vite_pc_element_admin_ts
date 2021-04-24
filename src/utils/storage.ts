// eslint-disable-next-line no-proto
const SESSION_PROTO = sessionStorage.__proto__;
const TYPES = 'propTypes';

// 设置值
export function setSession(key: string, value: any) {
  let val = value;

  // object类型就需要转化成json储存
  if (typeof value === 'object') {
    val = JSON.stringify(value);
  } else if (typeof value === 'function') {
    // 禁止添加function
    val = '';
  } else {
    val = value;
  }

  // value的类型
  if (!(TYPES in SESSION_PROTO)) {
    SESSION_PROTO[TYPES] = {};
  }
  SESSION_PROTO[TYPES][key] = typeof value;

  // 设置值
  sessionStorage.setItem(key, val);
}

// 获取值
export function getSession(key: string) {
  const val = sessionStorage.getItem(key);

  if (val === '' || val === null) {
    return '';
  } else if (
    SESSION_PROTO[TYPES] &&
    SESSION_PROTO[TYPES][key] &&
    SESSION_PROTO[TYPES][key] === 'string'
  ) {
    return val;
  } else {
    return JSON.parse(val);
  }
}

// 删除一项
export function remoceSession(key: string) {
  sessionStorage.removeItem(key);
  SESSION_PROTO[TYPES][key] = '';
}

// 删除所有
export function clearSession() {
  sessionStorage.clear();
  SESSION_PROTO[TYPES] = {};
}
