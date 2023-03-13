/**枚举LPlatform*/
export enum LPlatform {
  /**App*/
  AppPlus = 'APP-PLUS',
  /**App nvue*/
  AppPlusNvue = 'APP-PLUS-NVUE',
  /**H5*/
  H5 = 'H5',
  /**微信小程序*/
  MpWeixin = 'MP-WEIXIN',
  /**支付宝小程序*/
  MpAlipay = 'MP-ALIPAY',
  /**百度小程序*/
  MpBaidu = 'MP-BAIDU',
  /**字节跳动小程序*/
  MpToutiao = 'MP-TOUTIAO',
  /**QQ小程序*/
  MpQq = 'MP-QQ',
  /**360小程序*/
  Mp360 = 'MP-360',
  /**微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序*/
  Mp = 'MP',
  /**快应用通用(包含联盟、华为)*/
  QuickappWebview = 'quickapp-webview',
  /**快应用联盟*/
  QuickappWebviewUnion = 'quickapp-webview-union',
  /**快应用华为*/
  QuickappWebviewHuawei = 'quickapp-webview-huawei',
}

/**使用条件编译获取平台信息*/
export function ifDefPlatform(): LPlatform {
  let platform: LPlatform;
  //#ifdef APP-PLUS
  platform = LPlatform.AppPlus;
  //#endif
  //#ifdef APP-PLUS-NVUE
  platform = LPlatform.AppPlusNvue;
  //#endif
  //#ifdef H5
  platform = LPlatform.H5;
  //#endif
  //#ifdef MP-WEIXIN
  platform = LPlatform.MpWeixin;
  //#endif
  //#ifdef MP-ALIPAY
  platform = LPlatform.MpAlipay;
  //#endif
  //#ifdef MP-BAIDU
  platform = LPlatform.MpBaidu;
  //#endif
  //#ifdef MP-TOUTIAO
  platform = LPlatform.MpToutiao;
  //#endif
  //#ifdef MP-QQ
  platform = LPlatform.MpQq;
  //#endif
  //#ifdef MP-360
  platform = LPlatform.Mp360;
  //#endif
  //#ifdef MP
  platform = LPlatform.Mp;
  //#endif
  //#ifdef quickapp-webview
  platform = LPlatform.QuickappWebview;
  //#endif
  //#ifdef quickapp-webview-union
  platform = LPlatform.QuickappWebviewUnion;
  //#endif
  //#ifdef quickapp-webview-huawei
  platform = LPlatform.QuickappWebviewHuawei;
  //#endif
  return platform;
}

/**平台类型*/
export const Platform: LPlatform = ifDefPlatform();
/**默认导出平台类型*/
export default Platform;

/**App*/
export const isAppPlus = Platform == LPlatform.AppPlus;
/**App nvue*/
export const isAppPlusNvue = Platform == LPlatform.AppPlusNvue;
/**H5*/
export const isH5 = Platform == LPlatform.H5;
/**微信小程序*/
export const isMpWeixin = Platform == LPlatform.MpWeixin;
/**支付宝小程序*/
export const isMpAlipay = Platform == LPlatform.MpAlipay;
/**百度小程序*/
export const isMpBaidu = Platform == LPlatform.MpBaidu;
/**字节跳动小程序*/
export const isMpToutiao = Platform == LPlatform.MpToutiao;
/**QQ小程序*/
export const isMpQq = Platform == LPlatform.MpQq;
/**360小程序*/
export const isMp360 = Platform == LPlatform.Mp360;
/**微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序*/
export const isMp = Platform == LPlatform.Mp;
/**快应用通用(包含联盟、华为)*/
export const isQuickappWebview = Platform == LPlatform.QuickappWebview;
/**快应用联盟*/
export const isQuickappWebviewUnion = Platform == LPlatform.QuickappWebviewUnion;
/**快应用华为*/
export const isQuickappWebviewHuawei = Platform == LPlatform.QuickappWebviewHuawei;
/**是否开发环境*/
export const isDevelopment = process.env.NODE_ENV == 'development';
/**是否线上环境*/
export const isProduction = process.env.NODE_ENV == 'production';
/**抖音小程序*/
export const isMpDouyinApp = uni.getSystemInfoSync().appName == 'Douyin';
/**头条小程序*/
export const isMpToutiaoApp = uni.getSystemInfoSync().appName == 'Toutiao';
