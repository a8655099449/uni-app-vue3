/*
 * @Author: 大步佬 865509949@qq.com
 * @Date: 2022-08-30 14:43:57
 * @LastEditTime: 2023-03-09 17:24:01
 * @FilePath: \maas-mini\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 全局请求封装
import store from '../../store';
import { ObtainingEncryptedData, decode } from './encryptionAndDecryption.js';
const baseUrl = '';
const request = (
  url: any, // 请求路径
  method: any = 'get', // 请求方法s
  params: any = {}, // 请求参数
  white = false, // 是否为请求白名单 ，也就是不需要登录也能请求的
  {
    hideLoading = false, // 是否显示loading
    isBaseUrl = true, // 是否增加BaseUrl
    isEncode = true, // 是否需要加密数据
    isToast = true, // 当请求错误时是否弹出错误信息
    isConsole = false, // 是否需要打印参数，以免过多的打印造成刷屏
    appRequest = false, // 是否是客户端唤起小程序支付页面的请求
    isMask = false, //全局蒙版
  } = {},
) => {
  if (!hideLoading) {
    uni.showLoading({
      title: '加载中...',
      mask: isMask,
    });
  }
  if (params && isConsole) {
    handleConsole({
      consoleContent: params,
      title: `${url}requestBodyParams`,
    });
  }

  const token = uni.getStorageSync('MAAS_TOKEN');
  // app跳转小程序直接传递token, 不使用本地token
  const appToken = uni.getStorageSync('APP_TOKEN') || '';

  // // 执行没有登录的逻辑
  if (!white && !token && !appToken) {
    return;
  }
  if (isBaseUrl) {
    url = baseUrl + url;
  }
  if (method !== 'get') {
    params = ObtainingEncryptedData(params);
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      header: {
        Authorization: appRequest ? appToken : token ? `Bearer ${token}` : null,
        Resource: 'App',
      },
      data: params,
      timeout: 60000,
      success(res) {
        const data: any = res.data;
        // 百度api 的返回格式
        if (data.status == 0) {
          resolve(data);
          return;
        }
        if (data.status === 8) {
          resolve(data);
          return;
        }

        if (data && data.code === 200) {
          if (!data.result) {
            resolve(data);
            return;
          }

          let response = data.result;
          if (isEncode) {
            response = decode(response);
          }
          if (isConsole && response) {
            handleConsole({
              consoleContent: response,
              title: `${url}######responseData`,
            });
          }

          try {
            const resp = JSON.parse(response);
            resolve(resp);
          } catch (err) {
            resolve(response);
          }
        } else {
          // 403处理
          if (data.code === 403 && !appRequest) {
            if (navigateToLogin()) {
              return;
            }
            store.commit('setToken', '');
            const pageParams = getCurrentPages(); //当前页面栈

            if (pageParams && pageParams.length > 0) {
              const pageOption: any = pageParams[pageParams.length - 1];
              if (pageOption && pageOption.$page && pageOption.$page.fullPath) {
                if (pageOption.$page.fullPath == '/pages/login/index') {
                  return;
                }
              }
            }
            uni.redirectTo({
              url: '/pages/login/index',
            });
            return;
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
        if (isConsole && err) {
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
  store.commit('setToken', '');
  const pageParams: any = getCurrentPages(); //当前页面栈
  if (pageParams && pageParams.length > 0) {
    const pageOption = pageParams[pageParams.length - 1];

    if (pageOption && pageOption.$page && pageOption.$page.fullPath) {
      if (pageOption.$page.fullPath == '/pages/login/index') {
        return true;
      }
    }
  }
  uni.redirectTo({
    url: '/pages/login/index',
  });
  return true;
}

export const handleConsole = ({ consoleContent = null, title = 'data' }) => {
  if (consoleContent && isJson(consoleContent)) {
    consoleContent = JSON.parse(consoleContent);
    console.log(JSON.stringify(consoleContent, null, 2));
  }
  console.log(title);
};

export const showErrMessage = (msg: string) => {
  setTimeout(() => {
    Message.info(msg || '请求出错啦，请重试~');
  }, 50);
};

const isJson = (data: any) => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    //TODO handle the exception
    return false;
  }
};

const Message = {
  info(title = '消息') {
    uni.showToast({
      title,
      icon: 'none',
    });
  },
};

export default request;
