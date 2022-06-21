import { _AP } from '../utils/urlencode';
import { isWeChat } from '../utils';
import * as PayType from './payType';

const textUrl = window.location.origin;

/**
 * @desc 支付宝支付
 *
 * @param {PayProps} { orderNo, payUrl, openId }
 */
function alipay({ orderNo, payUrl, openid, isFromVlc, goodsType, env }: PayType.PayProps): void {
  if (window.top) {
    if (isWeChat) {
      if (isFromVlc) { // Vlc直播间
        const WXHost = env && env === 'prod' ? 'https://wx.kaikeba.com' : 'https://wxtest.kaikeba.com'
        if (goodsType === 'matter') { // 实物商品
          window.top.location.href = `${WXHost}/alipay/${orderNo}?orderUrl=${_AP.a_encode(
            encodeURIComponent(payUrl)
          )}&openId=${openid}&material=${goodsType}`;
          return
        }
        // 虚拟商品
        window.top.location.href = `${WXHost}/alipay/${orderNo}?orderUrl=${_AP.a_encode(
          encodeURIComponent(payUrl)
        )}&openId=${openid}`;
        return
      }
      window.top.location.href = `${textUrl}/pay-cashier/alipaytips?orderNo=${orderNo}&orderUrl=${_AP.a_encode(
        encodeURIComponent(payUrl)
      )}&openId=${openid}`;
    } else {
      window.top.location.href = payUrl;
    }
  }
}
/**
 * @desc  微信h5 支付
 *
 * @param {WxH5Props} params
 */
function wxH5(params: PayType.WxH5Props): void {
  const {
    appId,
    timeStamp,
    nonceStr,
    packageValue,
    signType,
    paySign,
    orderNo,
    onSuccess,
    isFromVlc,
    goodsType,
    onSuccessVlc,
    onCloseWechat
  } = params;
  const par = {
    appId,
    timeStamp,
    nonceStr,
    package: packageValue,
    signType,
    paySign,
    orderNo,
    onSuccess,
    isFromVlc,
    goodsType,
    onSuccessVlc,
    onCloseWechat
  };

  if (!isWeChat) {
    window.location.href = `${params.mwebUrl}&redirect_url=${textUrl}/pay-cashier/paysuccess?orderNo=${orderNo}`;
  }
  if (typeof WeixinJSBridge !== 'undefined') {
    onBridgeReady(par);
    return;
  }

  if (document.addEventListener) {
    document.addEventListener(
      'WeixinJSBridgeReady',
      () => {
        onBridgeReady(par);
      },
      false
    );
    return;
  }

  if ((<any>window).attachEvent) {
    (<any>window).attachEvent('WeixinJSBridgeReady', () => {
      onBridgeReady(par);
    });
    (<any>window).attachEvent('onWeixinJSBridgeReady', () => {
      onBridgeReady(par);
    });
    return;
  }
}

// function h5toWx(params: h5WxProps): void {
//   if (!isWeChat) {
//     window.location.assign(`${params.mwebUrl}&redirect_url=${params.payUrl}`);
//   }
// }

function onBridgeReady(params: PayType.WxH5Props) {
  WeixinJSBridge.invoke('getBrandWCPayRequest', params, async (res: any) => {
    if (res.err_msg == 'get_brand_wcpay_request:ok') {
      const { onSuccess, onSuccessVlc, isFromVlc, orderNo, goodsType } = params;
      if (isFromVlc) {
        onSuccessVlc?.({
          code: 0,
          data: {
            orderNo,
            goodsType
          }
        })
        return
      }
      onSuccess?.(orderNo);
      //成功后跳转到支付成功页面
      // if (Number(sell) === 1 && model === 1) {
      //   window.location.href = `groupDepositSuccess?orderId=${params.orderNo}`;
      // } else {
      window.location.href = `${textUrl}/pay-cashier/paysuccess?orderNo=${params.orderNo}`;
      // }
    } else if (res.err_msg === 'get_brand_wcpay_request:cancel') { // 取消支付
      const { onCloseWechat } = params
      onCloseWechat?.()
    } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
      // 支付失败
    }
  });
}

/**
 * @desc 京东支付
 *
 * @param {PayType.PayProps} { orderNo, payUrl, openId }
 */
function jdPay({ webUrl }: PayType.PayProps) {
  if (isWeChat && webUrl) {
    window.location.href = webUrl;
  }
  if (window.top && webUrl) {
    window.location.href = webUrl;
    // window.top.location.href = `${textUrl}jdpay/${orderNo}?orderUrl=${_AP.a_encode(
    //   encodeURIComponent(webUrl)
    // )}&&openId=${openid}`;
  }
}

/**
 * @desc  分期支付
 *
 * @param {PayType.StagesPayProps} { payUrl }
 */
function stafesPay({ payUrl }: PayType.StagesPayProps) {
  if (window.top) {
    window.top.location.href = payUrl;
  }
}

const actions: PayType.ActionsType[] = [
  {
    type: [0, 22], // 支付宝 花呗
    fn: params => alipay(params as PayType.PayProps),
  },
  {
    type: [1, 13], // 微信
    fn: params => wxH5(params as PayType.WxH5Props),
  },
  {
    type: 16, // 京东
    fn: params => jdPay(params as PayType.PayProps),
  },
  {
    type: [5, 9], // 分期
    fn: params => stafesPay(params as PayType.StagesPayProps),
  },
];

export const pay = ({ type, ...params }: PayType.PayTypeProps) => {
  actions.find(item => {
    if (Array.isArray(item.type)) {
      item.type.includes(type) && item.fn(params);
    } else {
      item.type === type && item.fn(params);
    }
  });
};
