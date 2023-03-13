/*
 * @Author: 大步佬 865509949@qq.com
 * @Date: 2022-08-30 14:43:57
 * @LastEditTime: 2023-03-13 15:30:24
 * @FilePath: \maas-mini\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 全局请求封装
import store from '../../store';
import { isH5 } from '../LPlatform';
import { ObtainingEncryptedData, decode } from './encryptionAndDecryption';
const baseUrl: string = import.meta.env.VITE_BASE_API;
const request = (
  url: string, // 请求路径
  params: any = {}, // 请求参数
  {
    method = 'get',
    hideLoading = false, // 是否显示loading
    isToast = true, // 当请求错误时是否弹出错误信息，当为true时给出提示2s后才会回调业务端
    isMask = false, //全局蒙版，为true是不能点击穿透
    isLogin = false, //接口本地效验是否需要登录
  } = {},
) => {
  if (!hideLoading) {
    uni.showLoading({
      title: '加载中...',
      mask: isMask,
    });
  }
  const token = store.state.token;
  // 执行没有登录的逻辑
  if (!token && isLogin) {
    return;
  }
  if (method !== 'get') {
    //目前定义get不做参数加密处理，该判断更具实际情况而定
    params = ObtainingEncryptedData(params); //参数加解密请进入内部配置
  }
  if (!isH5) {
    //h5走代理域名的方式，app、小程序走域名拼接方式
    url = baseUrl + url;
  }

  const methodl: any = method;
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method: methodl,
      header: {
        //令牌传输，该方式与服务端协商，可不传
        Authorization: token ? `Bearer ${token}` : '',
        Resource: 'App',
      },
      data: params,
      timeout: 60000, //最大超时时长
      success(res) {
        const data: any = res.data;
        if (data && data.code === 200) {
          if (!data.result) {
            resolve(data);
            return;
          }
          const response = decode(data.result); //是否需要解密，具体业务具体看
          try {
            const resp = JSON.parse(response);
            resolve(resp);
          } catch (err) {
            resolve(response);
          }
        } else {
          // 403处理 没有权限访问接口:跳转到指定
          if (data.code === 403) {
            if (navigateToLogin()) {
              return;
            }
          }
          if (isToast) {
            showErrMessage(data.msg || '请求出错啦，请重试~');
            setTimeout(function () {
              try {
                reject({
                  code: data.code,
                  msg: data.msg,
                });
              } catch (err) {
                reject({
                  code: data.code,
                  msg: '请求失败，请重试~',
                });
              }
            }, 2000);
          } else {
            reject({
              code: data.code || data.status,
              msg: data.msg || data.message,
            });
          }
        }
      },
      fail(err) {
        if (err) {
          const cons: any = err;
          handleConsole({
            consoleContent: cons,
            title: 'err',
          });
        }
        if (isToast) {
          showErrMessage('请求超时啦，请重试~');
          setTimeout(function () {
            reject(err);
          }, 100);
        } else {
          reject(err);
        }
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};
function navigateToLogin() {
  console.log('请确认是否跳转');
  return true;
}

export const handleConsole = ({ consoleContent = null, title = 'data' }) => {
  if (consoleContent && isJson(consoleContent)) {
    consoleContent = JSON.parse(consoleContent);
    console.log(JSON.stringify(consoleContent, null, 2));
  }
  console.log(title);
};

//错误提示
export const showErrMessage = (msg: string) => {
  setTimeout(() => {
    uni.showToast({
      title: msg,
      icon: 'none',
    });
  }, 50);
};
//判断是否json
const isJson = (data: any) => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    //TODO handle the exception
    return false;
  }
};

export default request;
