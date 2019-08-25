
// 身份证
export const certReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

// email
export const emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

// 用户名
export const accountReg = /^[a-zA-Z0-9_-]{4,16}$/;

export const passwdReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/;

// ip地址
export const ipReg = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;

// 手机号
export const mobileReg = /^[1][0-9]{10}$/;

// 颜色正则
export const colorReg = [
  /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/,
  /^[rR][gG][Bb][Aa]?[(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[)]{1}$/g,
];

export const searchParamsReg = /(\w+)=(\w+)/ig;

export const fileNameReg = /[^\/\s]+\.[\w]+$/;

export const noBlankReg = /^[^ ]+[\s\S]*[^ ]+$/;

export const trimReg = /(^\s+)|(\s+$)/;

export const urlReg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;

export const numberReg = /^[0-9]+$/;

export const twoDecimalNumberReg = /^[0-9]+([.]{1}[0-9]{1,2}){0,1}$/;

export const fourDecimalNumberReg = /^[0-9]+([.]{1}[0-9]{1,4}){0,1}$/;

/*统一社会信用代码*/
export const unifiedSocialCreditCode = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;


