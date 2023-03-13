export const $Message = {
  info(msg = '普通消息') {
    uni.showToast({
      title: msg,
      icon: 'none',
    });
  },
  error(msg = '错误信息') {
    uni.showToast({
      title: msg,
      icon: 'error',
    });
  },
  success(msg = '成功消息') {
    uni.showToast({
      title: msg,
      icon: 'success',
    });
  },
};
