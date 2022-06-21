import { PayType } from '../pay/payType';
import { RequestOptions} from '../utils/axios/types';
import type {AxiosRequestHeaders} from 'axios'

type BaseParams<T> = {
  params: T;
  options?: RequestOptions;
};


// 1 普通订单 2  组合商品订单  3 恩合订单  4 清新冥想、开小课订单
export type OrderStrategy = 1 | 2 | 3 | 4
// 分期参数
export interface EmiAmounts {
  emi: number;
  amount: number;
}

//  0-正价课，1-体验课，2-公开课，3-新公开课，4-大课畅学卡，5组合商品，6-培优课，7-会员
export type CourseType = 0 | 1 | 2 | 3 | 4 | 5 | 6|7;

// 0 待付款 1 处理中（如分期支付，订金，尾款支付，完成了部分支付）2 已付款 3 超时 4 退款 5 部分退款 6已取消
export type OrderStatus = 0|1|2|3|4|5|6

//是否定金 0否 1是
export type CourseModel= 0|1

// 当前应付为定金还是尾款 -1全款 0定金 1尾款
export type CurrentPayType = -1|0|1

export interface PayChannel {
  id: number;
  name: string;
  code: string;
  icon: string;
  cls: string;
  online: number;
  payType: PayType;
  sort: number;
  status: null | number;
  emiAmounts: null | EmiAmounts[];
}

export interface PayWayListParams {
  courseCode?: string; // 商品为组合商品时，不传该字段
  no?: string; // 订单号（组合商品使用）
  openid?: string; // （组合商品使用）
  plantForm?:string; // app/pc/h5
  // 花呗分期需要的价格
  amount?:number;
}

export type ApiPayWayListParams = BaseParams<PayWayListParams>

export interface ApiPayWayListResult {
  payChannel: PayChannel[];
  protocol:string;
}

export interface ApiCourseDetailResult {
  amount: number;
  // 绑定手机号 1绑定 0未绑定
  bindMobile: 1 | 0;
  bussinessId: number;
  // 是否可以享受会员折扣 0 否 不能享受会员 折扣  1  是 可以享受 会员 折扣
  canVipDiscount: 0 | 1;
  channelCode: string;
  cheeseId: 0 | 1 | 2 | 3;
  // 班次状态（0 准备 1招生 2授课 3结束）
  classStatus: number;
  copywriting: null | string;
  courseCode: string;
  courseId: number;
  // 课程name
  courseName: string;
  courseType: CourseType;
  // 朋友圈标题
  friendCircleTitle: string;
  // 群分享标题
  groupShareTitle: string;
  icon: string;
  itemId: number;
  itemSkuCode: string;
  md: number;
  // 0 普通模式 1 定金模式
  model: CourseModel;
  orderNo: null | string;
  payChannel: PayChannel[];
  payStatus: number;
  // 展示价格 showPrice
  price: number;
  protocolMode: number;
  // 协议状态0普通1
  protocolStatus: number;
  scholarship: number;
  scholarshipSwitch: number;
  // 分享缩略图
  shareCoverImage: string;
  // 分享描述
  shareDescription: string;
  // 0展示、1不展示
  siteShow: number;
  subjectId: number;
  // 0：默认、1：折扣、2：推广
  type: 0 | 1 | 2;
  used: number;
  // 渠道是否有效(课程是否有在招生中班次) 0 无效（没有招生中） 1 有效（有招生中班次）
  validChannel: 0 | 1;
  // 定金模式订单状态 10 未下单 0 待处理 1 处理中 2 已完成
  orderStatusType: 10 | 0 | 1 | 2;

  // vipAmount: number;
  // vipDiscount: number;

  // 是否是会员身份的用户  0  否  1  是（不传 uid 都会返回 0）是会员身份 才会 返回下面 相关字段
  memberUser: 0 | 1;
  // 0有效 1无效
  memberStatus: 0 | 1;
  // 当前用户会员级别 1年费 0月费
  memberLevel: 0 | 1;
  // 是否快过期了   1 快过期了 0 没过期
  expiring: 0 | 1;
  // 会员开始时间
  memberStartTime: string;
  // 会员结束时间
  memberEndTime: string;
  // 剩余有效天数
  remainingDays: number;
  // 会员 优惠 金额
  vipDiscount: number;
  // 年费会员 购买正价课/培优课 的 折扣后的实际 支付 金额；普通会员 购买 公开课/体验课 的 折扣后 的 实际 支付金额；
  vipAmount: number;
  // 曾经是非会员身份 有用  0 曾经不是（年费）会员  1  曾经是 （年费）会员
  memberOnce: 0 | 1;
}

export interface ApiGroupDetailResult{
  amount: number;
bindMobile: number;
binding: number;
bussinessId: number;
canVipDiscount: number;
channelAmount: number;
channelStatus: number;
code: string;
contentImage: string;
coursePeriod: string;
courseUnit: string;
createBy: number;
createTime: number;
description: string;
discount: null|number;
dueAmount: number;
endTime: null|string;
formId: number;
formal: number;
friendCircleTitle: string;
groupShareTitle: string;
icon: string;
id: number;
itemId: number;
joinMemberDiscount: number;
md: number;
memberUser: 0 | 1;
model: number;
name: string;
once: null|number;
orderNo: null|string;
orderStatus: null|number;
orderType: number;
payStatus: number;
protocolMode: number;
qrcodeGroupRole: number;
qrcodeGroupUrl: string;
shareCoverImage: string;
shareDescription: string;
skuDeposit: number;
skuUsable: number;
spuId: number;
stageId: number;
startTime: null|string;
subjectId: number;
text: null|string;
totalAmount: number;
totalPrice: number;
type: number;
updateTime: string;
used: number;
vipAmount: number;
vipDiscount: number;
}


// ?openid=o0IXitx_lVGqIU0Q26qYojqv4pAs&unionid=ocPQA1dkMB11rqsgUEktzVjISuQk

export type ApiCourseDetail = BaseParams<ApiCourseDetailParams>;
export interface ApiCourseDetailParams {
  openid: string;
  unionid: string;
  channelCode: string;
  courseCode: string;
  uid?: string;
  sell?:string
}

export interface PayOrderParams {
  openid: string;
  orderNo: string;
  payType: PayType;
  sell?:null | number;
  unionid?:string,
  parts?:string,
  endpoint?:string,
  // 分期 期数
  emi?: number;
  userId?: number;
}

export type ApiPayOrderParams = BaseParams<PayOrderParams>;

export interface IsVipUserParams {
  userId: number;
}

export type ApiIsVipUserParams = BaseParams<IsVipUserParams>;

export interface MemberDeailsList {
  id: number;
  spuId: number; // 会员spuid
  spuName: string | null; // 会员spu名称
  userMemberNo: string | null; // 用户会员编号
  userId: number; // uid
  startTime: string | null; // 该会员权益的开始时间
  endTime: string | null; // 该会员权益的结束时间
  memberLevel: number; // 用户会员级别 1年费 0月费
  spuSubtitle: string | null; // 会员副标题
}
export interface IsVipUserResult {
  id: number;
  userId: number;
  mobile: string;
  nickname: string | null; // 昵称
  headimgurl: string | null; // 头像
  startTime: string | null; // 会员整体开始时间
  endTime: string | null; // 会员过期开始时间
  status: number; // 是否过期 0有效 1过期
  memberLevel: number; // 当前用户会员级别 1年费 0月
  memberUserDetails: MemberDeailsList[]; // 会员明细
}

export interface CreateOrderParams {
  // 课程code 或者 组合商品 code 根据 下面的 orderStrategy 传不同意义的值
  courseCode: string;
  // 渠道 code
  channelCode: string;
  openid: string;
  unionid: string;
  // 用户id
  user_id: number;
  appid?: string;
  appOpenid?: string;
  // 自定义参数
  passback_params: string;
  mobile: string;
  // 购买用户id
  buyerId?: number;
  orderStrategy: OrderStrategy;
  returnUrl: string;
  //终端类型 PC pc官网; H5 移动h5官网; PE-H5; WX; IOS; ANDROID;  MINI  微信小程序
  endpoint: string;
  // 是否是 收银台 0 否 1是
  isCashier?:0|1;
  // 权益code 0-不选择：0； 
  checkedRightsCode?:0|1|2,
  // 是否是会员用户
  isVipUser: boolean;
}

export type ApiCreateOrderParams = BaseParams<CreateOrderParams>;

export type orderSource = 0 | 1 | 2; // 订单来源(0:H5;1:微信小程序;2:微信环境)

export interface goodDataParams
{
  productId: number; // 商品id
  quantity: number; // 购买数量
  channelCode: string; // 渠道code
}

export interface userInfoParams {
  userId: number; // 用户ID
  mobile: string; // 用户手机号
  unionId?: string; //
  openId?: string;
  appId?: string;
  appOpenId?: string;
}
export interface recvInfoParams {
  receiverName: string; // 收件人
  receiverMobile: string; // 收货人手机号	
  provinceAreaCode: string; // 省区域code	
  provinceAreaName: string; // 省区域名称	
  cityAreaCode: string; // 市区域code	
  cityAreaName: string; // 市区域名称	
  districtAreaCode: string; // 区/县区域code	
  districtAreaName: string; // 区/县区域名称	
  detailAddress: string; // 详细地址	
  postalCode?: string; // 邮编 非必填
}
export interface MatterCreateOrderParams { // 实物创建订单
  orderSource: orderSource; //
  payableAmount: number | undefined; // 应支付金额
  passbackParams?: string; // 前端扩展参数	
  endPoint: string; // 终端
  checkedRightsCode?: 0|1|2; // 选中权益编码 -1：默认 0：不使用权益 1：会员权益 2：米堆卡权益
  orderItems: goodDataParams[] | undefined; // 商品列表
  userInfo: userInfoParams; // 用户信息
  recvInfo: recvInfoParams | undefined; // 收货地址信息	
}

export type ApiMatterCreateOrder = BaseParams<MatterCreateOrderParams>;

export interface MatterPayOrderParams {
  orderNo: string;
  payType: PayType,
  endpoint: string;
  openid?: string;
}

export type ApiMatterPayOrder = BaseParams<MatterPayOrderParams>
export interface MatterOrderResult {
  orderUserNo: string; // 订单编号
}

export interface orderDetailParams {
  orderNo: string;
}

export type ApiOrderDetailParams = BaseParams<orderDetailParams>;

export interface ApiOrderDetailResult {
  no: string;
  wechatNo: string;
  // 0 正价课 1 体验课 2 公开课 3 新公开课
  courseType: CourseType;
  unionid: string;
  payTime: 1584620864;
  courseCode: string;
  sellerName: string;
  description: string;
  trackName: string;
  // 0线上订单  1线下订单  2 定金模式订单
  type: 0 | 1 | 2;
  title: string;
  classId: number;
  itemName: string;
  // 1组合商品
  sellType: number;
  sellerId: number;
  // 二维码
  qrCode: string;
  price: number;
  headimgurl: string;
  nickname: string;
  weChatNo: string;
  id: number;
  courseId: number;
  channelId: number;
  channelCode: string;
  amount: number;
  openid: string;
  trackId: number;
  bottom: string;
  updateTime: string;
  userId: number;
  itemSkuName: string;
  itemId: number;
  appOpenid: string;
  createTime: number;
  itemSkuId: number;
  appid: string;
  outOrderId: number;
  passbackParams: string;
  status: number;
  assignType: number;
  // 组合商品已支付成功的部分 0首付款 1尾款
  groupOrderParts: number[];
  // 组合商品定金模式的下一笔待付id
  nextPart: number[];
  // 尾款截止时间
  deadlineTime: number;
}

export type ApiCreateOrderResult = {
  courseCode: string;
  isVipUser: number;
  openid: string;
  orderId: null | string;
  orderNo?: string;
  orderStatus: OrderStatus;
  // 订单类型 0为0元订单 无需调取支付接口
  orderType: number;
  price: number;
  // 0线上订单1线下订单  2 定金模式订单
  vipOrderType: number;
};

export interface ApiCoursePotocol {
  // 课程类型
  type: number;
  // 课程id
  courseId: number;
}

export type ApiCoursePotocolParams = BaseParams<ApiCoursePotocol>;

export type ApiCoursePotocolResult = {
  protocol?: string;
};

export interface ApiOrderRight {
  userId: number;
  // 1 普通订单 2  组合商品订单  3 恩合订单  4 清新冥想、开小课订单
  orderStrategy: OrderStrategy;
  // 订单扩展参数
  passbackParams?: string;
  // 是否是会员用户
  isVipUser: 1 | 0;
  courseCode: string;
  channelCode: string;
}

export type ApiOrderRightParams = BaseParams<ApiOrderRight>;

export interface RightsItem {
  //0:默认 1：高手club 2:米堆
  code: 2 | 1 | 0;
  //订单应付金额
  amount: number;
  //使用权益前的金额
  price: number;
  //权益名称
  rightsName: string;
  //权益描述(8.26折购买)
  rightsRemark: string;
  //权益剩余次数
  rightsNum: number;
}

export type ApiOrderRightResult = {
  // 默认权益
  baseAmount: RightsItem;
  // 权益列表
  rightsAmountList: RightsItem[];
};

export interface ApiDeskUrl {
  // 场景类型 0-PC 1-H5
  sceneType: 0 | 1;
  // 课程id
  courseCode: string;
}

export type ApiDeskUrlParams = BaseParams<ApiDeskUrl>;

export interface ApiDeskUrlResult {
  loginUrl: string;
  failedUrl: string;
  successUrl: string;
  defaultSuccessUrl:string;
}

export interface RequestParamsType {
  platForm?: string;
  appId?: string;
  appName?: string
}

export interface ApiUserInfoParams {
  headers: AxiosRequestHeaders;
  params: RequestParamsType;
  options?: RequestOptions;
}

export interface ApiUserInfoResult {
  uid: number;
  mobile: string;
  nickname: string;
  avatar: string;
  unionid: string;
  openid: string;
  realname: string;
  token: string;
  // 0 非vip 1 vip
  vipFlag: 0 | 1;
}



export interface ApiGroupPayment {
  orderNo:string;
  unionid?:string;
  openid:string;
  // 尾款链接上的id用;拼接
  parts?:string;
  // 定金模式订单必传
  userId?:number
}

export type ApiGroupPaymentParams =BaseParams<ApiGroupPayment>;



export interface OrderPartsItem{
  id: number;
  // vip_order 表的 id';
  orderId: number;  
  // 订单总额;
  price: number;   
  // 子订单 金额'
  amount: number;  
  // 会员 优惠 金额
  vipDiscount: number; 
  // 会员购买金额
  vipAmount: number; 
  // 子订单 支付状态 0 处理中、1 成功、2 失败
  status: 0|1|2;  
  payType: PayType; 
  createTime: number;
  modifyTime: number;
  type: PayType 
}
export interface ApiGroupPaymentResult{
   // 本次应付总金额
  currentAmount:number;
  // 会员本次应付金额
  vipCurrentAmount:number;
     // 会员本次应付金额
  currentVipDiscount:number;
  // 1 是享受会权益 用户下的单  0  不是
  isVipUser:0|1; 
  // 订单总额
  orderAmount: number;
  // 会员 优惠 金额
  vipDiscount: number; 
  // 会员购买金额
  vipAmount: number; 
  // 如果channelModel为1 取该name
  name:string;
  // 当前应付为定金还是尾款 -1全款 0定金 1尾款
  currentPayType:CurrentPayType;
  // 用户已存在的订单状态 
  // 0 待付款 1 处理中（如分期支付，订金，尾款支付，完成了部分支付）2 已付款 3 超时 4 退款 5 部分退款 6已取消
  orderStatus: OrderStatus;
  // 订单类型 0线上订单1线下订单2定金订单
  orderType: 0|1|2;
  // 渠道类型 0 普通模式 1 定金模式
  channelModel:0|1;
  // 如果channelModel为1 取该orderParts数据
  orderParts:OrderPartsItem[];
  childOrder:{
    status:OrderStatus
        id : number;
        courseName:string;
        //是否定金 0否 1是
        model:CourseModel;
        //定金
        deposite: number;
        //尾款
        balance1: number;
        //该子商品本次应付金额
        amount:number;
        //折扣
        discount:number;
        vipDiscount: number; //会员 优惠 金额
                vipAmount: number; // 会员购买金额
        //当前应付为定金还是尾款 -1全款 0定金 1尾款
        currentPayType:CurrentPayType;
        orderParts:OrderPartsItem[]
  };
  payChannels:PayChannel[];
}

export interface ApiUserCourseIsBuy{
  userId:number;
  // type  传 1  普通商品  2  组合商品
  type:number;
  courseCode:string;	
  // 1,2,3  定金模式中具体需要支付的 哪个子订单
  parts?:string;
}

export type ApiUserCourseIsBuyParams = BaseParams<ApiUserCourseIsBuy>

export interface ApiUserCourseIsBuyResult {
   // 三种状态 0 未支付 1  部分付款 2 全部付款
   status: number;
   // 订单号  当状态是 0 的时候没有这个字段
   no: string;
   // 0线上订单1线下订单  2 定金模式订单
   type: 0|1|2;
   // 支付时间  订单状态 status 是2 的时候 才会返回这个字段  时间戳 秒级别
   payTime: number;
   partList:number[];
   amount: number;
}


