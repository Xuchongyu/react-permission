
/**
 * 空函数
 */
export function noop() {
}

// function RHL(target) {
//   if (process.env.NODE_ENV === 'development') {
//     return hot(module)(target);
//   }
//   return target;
// }

export function getRequest(url) {
  // 获取url中"?"符后的字串
  const theRequest = {}
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}


/**
 * 柯理化
 */
export function currying(fn) {
  const _args = Array.prototype.slice.call(arguments, 1);
  return function () {
    const _newArgs = Array.prototype.slice.call(arguments);
    return fn.apply(null, _args.concat(_newArgs));
  };
}

/**
 * 组合，函数从右向左执行
 */
export function compose() {
  const _funcs = Array.prototype.slice.call(arguments);
  return function () {
    let args = arguments;
    for (let i = _funcs.length - 1; i >= 0; i--) {
      args = [_funcs[i].apply(this, args)];
    }
    return args[0];
  };
}

/**
 * sequence的函数是顺序执行，从左往右
 */
export function sequence() {
  const _funcs = Array.prototype.slice.call(arguments);
  return function () {
    let args = arguments;
    for (let i = 0; i < _funcs.length; i++) {
      args = [_funcs[i].apply(this, args)];
    }
    return args[0];
  };
}

/**
 * @param type 字符串，要检测的类型的字符串
 * @return 类型检测函数
 * 根据传入的数据类型，返回该类型的类型检测函数
 * 类型检测使用 toString 函数
 */
function isType(type) {
  return function (val) {
    if (Object.prototype.toString.call(val) === `[object ${type}]`) {
      return true;
    }
    return false;
  };
}

export let isString = isType('String');
export let isArray = isType('Array');
export let isFunction = isType('Function');
export let isObject = isType('Object');
export let isNumber = isType('Number');

/**
 * 传入className的对象，返回className的字符串
 *
 * @param {*} [classesObj={}]
 * @returns
 */
export function classNameSet(classesObj = {}) {
  let classNames = '';
  for (const className in classesObj) {
    if (classesObj[className]) {
      classNames += className + ' ';
    }
  }
  return classNames.trim();
}

/**
 * @param num 数字
 * @param n 补零最短的长度
 * @return 补零后的数字字符串
 * 将传入的数值，根据 n 进行补零
 */
export function pad(num, n = 2) {
  num = '' + num;
  return Array(n > num.length ? n - num.length + 1 : 0).join('0') + num;
}

/**
 * 保留n位小数
 *
 * @param {*} num
 * @param {*} precision
 * @returns
 */
export function toFixed(num, precision) {
  return (Math.round(Number(num) * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
}

// 格式化数字：eg:将数字10000 -> 10,000.00
export function handleMoney(num, precision, separator) {
  let parts;
  // 判断是否为数字
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
    // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
    // 的值变成了 12312312.123456713
    num = Number(num);
    // 处理小数点位数
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
    // 分离数字的小数部分和整数部分
    parts = num.split('.');
    // 整数部分加[separator]分隔, 借用一个著名的正则表达式
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

    return parts.join('.');
  }
  return NaN;
  let result = "10000000".replace(/\d+?(?=(?:\d{3})+$)/img, "$& ");
  return result;
}

/**
 * 添加单位
 * @param {*} unit
 * @param {*} val
 */
export function addUnit(unit = '', val) {
  return (val || val === 0) ? `${val}${unit}` : '';
}

/**
 * 添加百分号
 */
export const addRadioUnit = currying(addUnit, '%');

/**
 * 检查rgb颜色
 *
 * @export
 */
export function checkRgbColor(color = '') {
  const colorReg = [
    /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/,
    /^[rR][gG][Bb][Aa]?[(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[)]{1}$/g,
  ]
  if (color.match(colorReg[0]) || color.match(colorReg[1])) {
    return true;
  }
  return false;
}

/**
 * 获取dom样式
 *
 * @export
 * @param {any} obj
 * @param {any} attr
 * @returns
 */
export function getStyle(obj, attr) {
  if (!obj) {
    return '';
  }
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

/**
 * 生成唯一标识符
 *
 * @export
 * @returns
 */
export function generateUUID() {
  var now = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (now + Math.random() * 16) % 16 | 0;
    now = Math.floor(now / 16);
    /* eslint-disable-next-line */
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};


/**
 * 将字符串前后保留，其他用...替代
 *
 * @export
 * @param {*} str
 * @param {number} [start=6]
 * @param {number} [end=6]
 * @returns
 */
export function ellipseMiddle(str, start = 6, end = 6) {
  let startIndex = start;
  let endIndex = end;
  for (let i = 0; i < start && i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      startIndex -= 1;
    }
  }
  for (let i = 0; i < end && i < str.length; i++) {
    if (str.charCodeAt(str.length - 1 - i) > 128) {
      endIndex -= 1;
    }
  }
  if (startIndex === 0) {
    startIndex = start / 2;
  }
  if (endIndex === 0) {
    endIndex = end / 2;
  }
  if (str.length <= startIndex || str.length <= endIndex || startIndex + endIndex >= str.length) {
    return str;
  }
  return str.substring(0, startIndex) + '...' + str.substring(str.length - endIndex);
}

/**
 * blob转dataURL
 *
 * @export
 * @param {*} blob
 * @returns
 */
export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
}

/**
 * dataUrl转blob对象
 *
 * @export
 * @param {*} dataurl
 * @returns
 */
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * dataURL转File对象
 *
 * @param {*} dataurl
 * @param {*} filename
 * @returns
 */
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * debounce 让函数多次调用，会按一个时间周期执行
 * 如果在不能调用函数的时间内调用函数，这次调用会被抛弃
 *
 * @param {*} fn
 * @param {*} wait
 * @param {*} immediate 每次调用的时候是否立即执行
 */
export function debounce(func, wait, immediate = false) {
  let timeout, args, context, timestamp, result;

  let later = function () {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，
    // 则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    let last = new Date().getTime() - timestamp;

    if (last < wait && last >= 0) {
      // 不断更新定时执行的时间
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    // 存下上下文和参数，用于异步调用时使用
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    // 第一次调用该方法时，且immediate为true，则调用func函数
    let callNow = immediate && !timeout;
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

/**
 * 多次调用函数，函数会按照上一个函数执行结束开始的一个周期执行
 *
 * @export
 * @param {*} func
 * @param {*} wait
 * @param {*} options
 * @returns
 */
export function throttle(func, wait, options) {
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true;
   */
  let context, args, result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 当到达wait指定的时间间隔，则调用func函数
    // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
    if (remaining <= 0 || remaining > wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // options.trailing=true时，延时执行func函数
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

export function randomString() {
  return Math.random().toString(36).substr(2, 15) + '' + new Date().getMilliseconds();
}

//加
export function add(arg1, arg2) {
  if ((!arg1 || !arg2) && (arg1 !== 0 && arg2 !== 0)) {
    return null;
  }
  var digits1, digits2, maxDigits;
  try { digits1 = arg1.toString().split(".")[1].length } catch (e) { digits1 = 0 }
  try { digits2 = arg2.toString().split(".")[1].length } catch (e) { digits2 = 0 }
  maxDigits = Math.pow(10, Math.max(digits1, digits2))
  return (arg1 * maxDigits + arg2 * maxDigits) / maxDigits
}

//减
export function sub(arg1, arg2) {
  if ((!arg1 || !arg2) && (arg1 !== 0 && arg2 !== 0)) {
    return null;
  }
  var digits1, digits2, maxDigits;
  try { digits1 = arg1.toString().split(".")[1].length } catch (e) { digits1 = 0 }
  try { digits2 = arg2.toString().split(".")[1].length } catch (e) { digits2 = 0 }
  maxDigits = Math.pow(10, Math.max(digits1, digits2));
  return (arg1 * maxDigits - arg2 * maxDigits) / maxDigits;
}

//乘
export function mul(arg1, arg2) {
  if ((!arg1 || !arg2) && (arg1 !== 0 && arg2 !== 0)) {
    return null;
  }
  if (arg1 || arg1 === 0) {
    var digits = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { digits += s1.split(".")[1].length } catch (e) { }
    try { digits += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, digits);
  } else {
    return null;
  }
}

//除
export function div(arg1, arg2) {
  if ((!arg1 || !arg2) && (arg1 !== 0 && arg2 !== 0)) {
    return null;
  }
  var int1 = 0, int2 = 0, digits1, digits2;
  try { digits1 = arg1.toString().split(".")[1].length } catch (e) { digits1 = 0 }
  try { digits2 = arg2.toString().split(".")[1].length } catch (e) { digits2 = 0 }

  int1 = Number(arg1.toString().replace(".", ""))
  int2 = Number(arg2.toString().replace(".", ""))
  return (int1 / int2) * Math.pow(10, digits2 - digits1);

}
