/*
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: liuxiang liuxiang@163.com
 * @Description:
 * @params:
 * @Date: 2022-11-04 16:46:52
 * @LastEditTime: 2023-03-09 16:14:20
 */
import request from '../utils/request/request';

export const getOpenId = (params) =>
  request('/service-auth/mini/auth/getOpenId', 'post', params, true, {
    hideLoading: true,
  });

// app跳转获取openId
export const getJumpPayOpenId = ({ appBaseUrl, ...rest }) =>
  request(`${appBaseUrl}/service-auth/mini/auth/getOpenId`, 'post', rest, true, {
    isBaseUrl: false,
    appRequest: true,
    isMask: true,
  });

export const getPhone = (params) =>
  request('/service-auth/mini/auth/getUserPhone', 'post', params, true, { isConsole: true });

export const accessToken = (params) =>
  request('/service-auth/mini/auth/accessToken', 'post', params, true, { isConsole: true });

export const logout = (params) => request('/service-auth/mini/auth/loginOut', 'get', params, false);

export const bindPhone = (params) =>
  request('/service-auth/mini/auth/wxLogin', 'post', params, true);

// 登录协议详情
export const getAgreement = (params) =>
  request('/service-provide/mini/agreement/getAgreement', 'get', params, true);
