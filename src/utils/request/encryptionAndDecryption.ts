/*
 * @Description: 加密和解密
 * @Author: ltm
 * @Date: 2022-6-16 16:47:21
 * @params:
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-09 16:34:55
 */
import CryptoJS from 'crypto-js';
import hmac from 'crypto-js/hmac-md5';

// 生成随机字符串
const getStr = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// 获取当前时间
const getTime = () => {
  const date = new Date();
  // const seperator1 = '-';
  // const seperator2 = ':';
  const month: number = date.getMonth() + 1;
  const strDate = date.getDate();
  let monthStr: string = month.toString();
  if (month >= 1 && month <= 9) {
    monthStr = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    monthStr = `0${strDate}`;
  }
  const currentdate = `${
    date.getFullYear() + monthStr + strDate
  }${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  return currentdate;
};

// 声明偏移量和密匙
const appId_ = '695399723';
const sigSecret = '5114CABC10FA48C1'; // md5 key
const kDataSecretIV = '0012542f9ccdSW01'; // aes128偏移量
const kDataSecret = '00324331022C62F1'; // aes128秘钥
// const appSecret = 'FBB37082DA1B47A1';

// 数据加密
export const ObtainingEncryptedData = (data: any) => {
  const str = getStr();
  const formatedKey = CryptoJS.enc.Utf8.parse(kDataSecret); // 将 key 转为 128bit 格式
  const formatedIv = CryptoJS.enc.Utf8.parse(kDataSecretIV); // 将 iv 转为 128bit 格式
  let encrypted: any = '';
  if (typeof data === 'string') {
    encrypted = CryptoJS.AES.encrypt(data, formatedKey, {
      iv: formatedIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  } else if (typeof data === 'object') {
    const params = JSON.stringify(data);
    encrypted = CryptoJS.AES.encrypt(params, formatedKey, {
      iv: formatedIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  }
  const dataEncryp = encrypted.toString(); // 解析成一串字符串
  const signature = appId_ + dataEncryp + getTime() + str; // 签名拼接
  const signatureEncryption = hmac(signature, sigSecret).toString(); // 对签名进行MD5加密
  const requestParam = {
    appId: appId_,
    data: dataEncryp,
    timeStamp: getTime(),
    nonce: str,
    sign: signatureEncryption,
  };

  return requestParam;
};

// 数据解密
export const decode = (data: any) => {
  if (data === undefined || data === null) {
    return '{}';
  }
  const formatedKey = CryptoJS.enc.Utf8.parse(kDataSecret); // 将 key 转为 128bit 格式
  const formatedIv = CryptoJS.enc.Utf8.parse(kDataSecretIV); // 将 iv 转为 128bit 格式
  const decryptedData = CryptoJS.AES.decrypt(data, formatedKey, {
    iv: formatedIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }); // 解密
  // eslint-disable-next-line no-console

  return decryptedData.toString(CryptoJS.enc.Utf8);
};
