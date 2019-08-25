import moment from 'moment';

/**
 * 时间戳转时间(年月日时分秒)
 * @param timestamp
 * @returns {string}
 */
export function timestampToTime(timestamp) {
  if (timestamp == null) {
    return '';
  }
  const date = new Date(timestamp);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
  const h = `${date.getHours() < 10 ? `0${date.getHours()}` : +date.getHours()}:`;
  const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
  const s = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
  return Y + M + D + h + m + s;
}

/**
 * 时间戳转时间(年月日)
 * @param timestamp
 * @returns {string}
 */
export function timestampToDate(timestamp) {
  if (timestamp == null) {
    return '';
  }
  const date = new Date(timestamp);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
  return Y + M + D;
}

/**
 * 时间范围组件的时间格式转为时间戳
 *
 * @param param 包含时间范围的对象
 * @param field
 * @param start 开始时间
 * @param end 结束时间
 * @param flag 是否需要把时间转为开始结00:00:00束时间23:59:59
 */
export function rangePickerToTimestamp(param, field, start, end, flag = true) {
  rangePickersToTimestamp(param, [{ field, start, end, flag }]);
}

/**
 * 时间范围组件的时间格式转为时间戳【可以有多个时间范围】
 *
 * @param param 包含时间范围的对象
 * @param fields 格式为[{field: 'field1', start: 'startFieldName', end: 'endFieldName', flag: true}]
 * @param flag 是否需要把时间转为开始结00:00:00束时间23:59:59
 */
export function rangePickersToTimestamp(param, fields) {
  if (fields && fields.length > 0) {
    for (let i = 0; i < fields.length; i++) {
      const each = fields[i];
      if (param[each.field] && param[each.field].length > 0) {
        param[each.start] = each.flag ? param[each.field][0].startOf('day').valueOf() : param[each.field][0].valueOf();
        param[each.end] = each.flag ? param[each.field][1].endOf('day').valueOf() : param[each.field][1].valueOf();
        delete param[each.field];
      }
    }
  }
}

/**
 * 时间组件的时间格式转为时间戳
 *
 * @param param 包含时间范围的对象
 * @param fields 字典
 */
export function datePickerToTimestamp(param, ...fields) {
  if (fields.length > 0) {
    for (let i = 0; i < fields.length; i++) {
      if (param[fields[i]]) {
        param[fields[i]] = moment(param[fields[i]]).valueOf();
      }
    }
  }
}

export function getCurrentDate(myDate) {
  const year = myDate.getFullYear();// 获取年
  let month = myDate.getMonth() + 1;// 获取月，默认从0开始，所以要加一
  let date = myDate.getDate();// 获取日
  let hours = myDate.getHours();// 获取小时
  let minutes = myDate.getMinutes();// 获取分
  let seconds = myDate.getSeconds();// 获取秒
  const weekend = myDate.getDay(); // 获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
  const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const day = weeks[weekend];// 这样就是显示的星期x了
  // 这些if判断是在小于10的时候前面自动补0
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${year}年${month}月${date}日 ${day}`;
}
