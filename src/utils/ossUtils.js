import base from "../api/base";
import { Message } from "@alifd/next";
import { getUrlInfo } from "../api/request";

/**
 * @Description: oss
 * @author zhangsiyi@hzlianyin.com
 * @date 2019-04-22 16:50
 */

const OSS_URL = getUrlInfo("oss", "querySTSInfo");
const tenantId = 1001;

/**
 * 获取oss配置
 */
export async function getOSSConfig() {
  await fetch(OSS_URL, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      serialId: Math.random().toString(36).substr(2) + new Date().getTime(),
      token: localStorage.getItem('token'),
      ...base.baseParams
    })
  }).then((response) => {
    return response.json();
  }).then((res) => {
    if (res.code === '000000') {
      const { expiration, sysTime } = res.data;
      const expire = new Date().getTime() + new Date(expiration).getTime() - new Date(sysTime).getTime() - 60 * 1000;
      localStorage.setItem("ossExpiration", expire);
      localStorage.setItem("ossConfig", JSON.stringify(res.data));
    } else {
      Message.error(res.message || 'sts请求错误');
    }
  }).catch((error) => {
    console.log(error);
  })
}

/**
 * 获取 oss 实例
 * @returns oss实例
 */
export async function getOSSInstance() {
  if (!localStorage.getItem("ossExpiration")) return;
  const ossExpiration = localStorage.getItem("ossExpiration");
  if (new Date().getTime() > ossExpiration) {
    await getOSSConfig();
  }
  if (!localStorage.getItem("ossConfig")) return;
  const { accessKeyId, accessKeySecret, bucketName, endPoint, securityToken } = JSON.parse(localStorage.getItem('ossConfig'));
  return new OSS({
    endpoint: endPoint,
    accessKeyId,
    accessKeySecret,
    bucket: bucketName,
    stsToken: securityToken,
  });
}

/**
 * 上传方法
 * @param name
 * @param file
 * @param progress
 * @param callback
 */
export function upload({ name, file, progress = null, callback }) {
  const instance = getOSSInstance();
  const pathName = getOSSFileName(name);
  instance.then((client) => {
    client.multipartUpload(
      pathName,
      file,
      {
        parallel: 4, // 并发上传的分片个数
        partSize: file.size > 100 * 1024 * 1024 ? 100 * 1024 * 1024 : '',
        progress: (percentage) => {
          progress && progress(percentage)
        },
        // mime: 'video/mpeg4',
        headers: {
          // 'Cache-Control': 'no-cache'
        }
      }
    ).then((res) => {
      callback && callback(res);
    }).catch((err) => {
      if (err.code === 'ConnectionTimeoutError') {
        console.log("Woops,超时啦!");
      }
    });
  })
}

/**
 * 根据图片oss返回的url，获取完整的url
 * @param url
 * @param options 接受process参数配置
 * @returns 完整的url
 */
export async function getUrl(url, options = {
  expires: 3600,
}) {
  const imageType = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'];
  const ifImage = imageType.indexOf(url.substr(url.lastIndexOf('.') + 1)) !== -1;
  if (!ifImage) {
    options = {
      expires: 3600
    };
  }
  const instance = getOSSInstance();
  return await instance.then((client) => {
    return client.signatureUrl(url, options)
  });
}

/**
 * 获取oss路径name
 * @param name 文件name
 * @returns {string}
 */
export function getOSSFileName(name) {
  const nowDate = new Date();
  return nowDate.getFullYear() + '-' + nowDate.getMonth() + 1 + '-' + nowDate.getDate() + '/' + nowDate.getTime() + '-' + name
}

/**
 * 根据oss sts的路径从oss下载文件
 * @param name
 */
export function download(name, reName) {
  const instance = getOSSInstance();
  const ext = name.substr(name.lastIndexOf(".") + 1);
  instance.then(async (client) => {
    // try {
    //   let result = await client.signatureUrl(name, {
    //     expires: 3600, 
    //     response: {
    //       'Content-Disposition': 'attachment; filename=download_file'
    //     }
    //   });
    //   console.log(result);
    //   window.location = result
    // } catch (e) {
    //   console.log(e);
    // }
    client.get(name).then((res) => {
      let eleLink = document.createElement('a');
      eleLink.download = reName ? reName + '.' + ext : name;
      eleLink.style.display = 'none';
      eleLink.href = window.URL.createObjectURL(new Blob([res.content.buffer]));
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    })
  });
}

/**
 * 从oss上获取file
 * @param name
 * @returns file
 */
export async function getFile(name) {
  const instance = getOSSInstance();
  return await instance.then((client) => {
    return client.get(name).then((file) => {
      return file;
    })
  });
}

/**
 * oss删除文件：支持批量与单个都行
 * @param name string: 单个； array: 批量；
 * @returns {Promise<*>}
 */
export async function deleteFile(name) {
  const instance = getOSSInstance();
  if (Array.isArray(name) && name.length > 0) {
    return await instance.then((client) => {
      return client.deleteMulti(name, {
        quiet: true
      });
    });
  } else {
    return await instance.then((client) => {
      return client.delete(name);
    });
  }
}



