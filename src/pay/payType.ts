export interface PayProps {
  orderNo: string;
  payUrl: string;
  openid: string;
  webUrl: string;
  isFromVlc?: boolean;
  goodsType?: string;
  env?: string;
}
export interface StagesPayProps {
  payUrl: string;
  userId: string;
  emi: string;
}

export interface VlcSuccessData {
  orderNo?: string;
  goodsType?: string;
}
export interface VlcSuccessCallbackResult {
  code: 0 | 1 | 2 | undefined; // 0：支付完成 1: 0元课 2: 购买过
  data?: VlcSuccessData 
}

export interface WxH5Props {
  appId: string; //公众号名称，由商户传入
  timeStamp: string; //时间戳，自1970年以来的秒数
  nonceStr: string; //随机串
  package?: string;
  packageValue?: string;
  signType: string; //微信签名方式：
  paySign: string; //微信签名
  orderNo: string;
  redirectUrl?: string;
  mwebUrl?: string;
  onSuccess?:(orderNo:string)=>void;
  isFromVlc?: boolean;
  goodsType?: string;
  onSuccessVlc?:(result: VlcSuccessCallbackResult) => void // vlc货架直播成功回调
  onCloseWechat?: () => void; // 取消微信支付
}

export interface h5WxProps {
  payUrl?: string;
  mwebUrl?: string;
}

export interface PCWxProps {
  codeUrl?: string;
}

export type PayAllProps = PayProps | WxH5Props | StagesPayProps | PCWxProps;

export interface ActionsType {
  type: number | number[];
  fn: (params: PayAllProps) => void;
}

// 支付类型 0支付宝、1微信、2贷款、3腾讯课堂、4网易云课堂、5芝士信用卡分期、6开课吧工行 7支付宝线下、8微信线下、9芝士无卡分期、10 KKB、11 苹果支付、12 小鹅通 13 微信H5 14 后厂-工行 15 花呗分期 16 京东支付
export type PayType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 22;

export type PayTypeProps = {
  type: PayType;
} & PayAllProps;
