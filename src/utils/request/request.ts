/*
 * @Author: 大步佬 865509949@qq.com
 * @Date: 2022-08-30 14:43:57
 * @LastEditTime: 2023-03-10 21:31:56
 * @FilePath: \maas-mini\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 全局请求封装
import store from '../../store';
import { ObtainingEncryptedData, decode } from './encryptionAndDecryption';
const baseUrl: string = import.meta.env.VITE_BASE_API;
const request = (
  url: string, // 请求路径
  params: any = {}, // 请求参数
  {
    method = 'get',
    hideLoading = false, // 是否显示loading
    isToast = true, // 当请求错误时是否弹出错误信息
    isMask = false, //全局蒙版
    isLogin = false,
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
    params = ObtainingEncryptedData(params);
  }
  // url = baseUrl + url;
  const methodl: any = method;
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method: methodl,
      header: {
        // Authorization: token ? `Bearer ${token}` : null,
        Resource: 'App',
      },
      data: params,
      timeout: 60000,
      success(res) {
        const data: any = res.data;
        if (data && data.code === 200) {
          if (!data.result) {
            resolve(data);
            return;
          }
          const response = decode(data.result);
          try {
            const resp = JSON.parse(response);
            resolve(resp);
          } catch (err) {
            resolve(response);
          }
        } else {
          // 403处理
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
