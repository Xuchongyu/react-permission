import {div} from './calculation';

/**
 * 金额格式化
 * 1、默认返回0.00
 * 2、三位一分割，四舍五入，保留两位小数
 * @param num
 * @returns {string}
 */
export function moneyFormat(num) {
    if (!num) {
        return '0.00';
    }
    let info = parseFloat(num).toFixed(2).toString().split('.');
    num = info[0];
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    info[0] = result;
    return info.join('.');
}

/**
 * 额度金额格式化
 * 额度大于10000000，以万为单位结尾，保留两位小数
 */
export function moneyFormatForQuota(num) {
    if (!num) {
        return '0.00';
    }
    if (parseFloat(num) < 10000000) {
        return moneyFormat(num);
    } else {
        num = div(num, 10000);
        return moneyFormat(num) + '万';
    }
}



