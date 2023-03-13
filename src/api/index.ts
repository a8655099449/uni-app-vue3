/*
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: liuxiang liuxiang@163.com
 * @Description:
 * @params:
 * @Date: 2022-11-04 16:46:52
 * @LastEditTime: 2023-03-10 21:21:57
 */
import request from '../utils/request/request';

export const queryLook = (params: object) =>
  request('/service-provide/mini/info/queryLook', params);
