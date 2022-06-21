import {createAxios} from './utils/axios'
import {VAxios} from './utils/axios/Axios'
import type {  CreateAxiosOptions ,} from './utils/axios/axiosTransform';
import type {RequestOptions} from './utils/axios/types'
import { LogInit } from './utils/figLog'

import { pay } from './pay';
import { PayTypeProps } from './pay/payType';

import {setObjToUrlParams} from './utils'

// import * as ApiList from './api';
import * as ApiType from './api/model';


enum Api {
  courseDetail = '/vipcourse',
  payOrder = '/vipcourse/payorder',
  sellPayOrder = '/vipcourse/group/payorder',
  createOrder = '/vipcourse/order',
  matterOrderUrl = '/order-base-web/order',
  matterPayOrderUrl = '/order-base-web/payOrder',
  potocol ='/vipcourse/protocol',
  orderRights = '/price-web/order/rights',
  orderDetail = '/vipcourse/order',
  deskUrl = '/pay/cashierDesk/url',
  userInfo = '/uaa/learn-users/info/openid',
  groupPayment = '/vipcourse/group/payment',
  courseBuyStatus='/vipcourse/course/buy/status',
  payWayList='/vipcourse/client/app/pay/channel',
  isVipUserUrl = '/member/user'
}


class PaySdk {
  private static env: string;
  private static instance: PaySdk;
  private static axios :VAxios ;
  private constructor() {}
  static getEnv():string {
    this.checkEnv()
    return this.env;
  }
  static init(env: string,axiosOptions?:RequestOptions):PaySdk {
    if (PaySdk.instance) {return PaySdk.instance;}
    PaySdk.instance = new PaySdk();
    this.env = env;
    this.axios = this.createAxiosFn(axiosOptions)
    return PaySdk.instance;
  }
  static createAxiosFn(axiosOptions?:RequestOptions){
      const opts = {} as CreateAxiosOptions
       opts.env = this.env
       opts.requestOptions=axiosOptions
      return createAxios(opts)
  }

  static pay(params: PayTypeProps) {
    this.checkEnv()
    PaySdk.env && pay(params);
  }
  
  /**
   * @description 根据token获取用户信息
   *
   * @static
   * @template T
   * @param {ApiType.ApiUserInfoParams} {headers,options}
   * @return {*} 
   * @memberof PaySdk
   */
   static getUserInfo<T>({headers,params, options}:ApiType.ApiUserInfoParams){
    this.checkEnv()
    return this.axios.get<T>(
      {
        url: `${Api.userInfo}`,
        params,
        headers,
      },
      options
    );
  }

  /**
   * @description  是否是会员
   *
   * @static
   * @template T
   * @param {ApiType.ApiIsVipUserParams} {
   *     params,
   *     options,
   *   }
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */

  static getIsVipUser<T>({params, options}:ApiType.ApiIsVipUserParams) {
    this.checkEnv()
    return this.axios.get<T>(
      {
        url: `${Api.isVipUserUrl}/${params.userId}`,
      },
      options
    );
  }


  /**
   * @description  获取课程详情接口
   *
   * @static
   * @template T
   * @param {ApiType.ApiCourseDetail} {
   *     params,
   *     options,
   *   }
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
  static getCourseDetail<T>( {
    params,
    options,
  }: ApiType.ApiCourseDetail) : Promise<T>  {
    this.checkEnv()

      return this.axios.get<T>(
        {
          url: `${Api.courseDetail}${params.sell?'/group':''}/${params.courseCode}/${params.channelCode}`,
          params: { openid: params.openid, unionid: params.unionid,uid:params.uid },
        },
        options
      );
  }

  /**
   * @description 组合商品获取支付渠道
   *
   * @static
   * @template T
   * @param {ApiType.ApiGroupPaymentParams} {params,options}
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
  static getGroupPayment<T>({params,options}:ApiType.ApiGroupPaymentParams):Promise<T>{
    this.checkEnv()
    const {orderNo,openid,unionid,parts,userId} = params
    return this.axios.get<T>(
      {
        url: `${Api.groupPayment}/${orderNo}`,
        params: { openid,unionid,parts,userId },
      },
      options
    )
  }

  /**
   * @description 用户权益
   *
   * @static
   * @template T
   * @param {ApiType.ApiOrderRightParams} {
   *     params,
   *     options,
   *   }
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
  static getOrderRights<T>({
    params,
    options,
  }:ApiType.ApiOrderRightParams):Promise<T>{
    this.checkEnv()
      return this.axios.post<T>(
        {
          url: `${Api.orderRights}`,
          params,
        },
        options
      );
  }

  /**
   * @description 获取课程协议
   *
   * @static
   * @template T
   * @param {ApiType.ApiCoursePotocolParams} {params,options}
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
  static getCoursePotocol<T>({params,options}:ApiType.ApiCoursePotocolParams):Promise<T>{
    this.checkEnv();
    return this.axios.get<T>(
      {
        url:`${Api.potocol}/${params.type}/${params.courseId}`
      },
      options
    )
  }

 
  /**
   * @description 创建订单接口
   *
   * @static
   * @template T
   * @param {ApiType.ApiCreateOrderParams} params
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
  static postCreateOrder<T>(params:ApiType.ApiCreateOrderParams):Promise<T>{
    this.checkEnv();
    return this.axios.post<T>(
      {
        url: `${Api.createOrder}`,
        params:params.params,
      },
      params.options
    );
  }

  /**
   * @description 实物商品创建订单接口
   *
   * @static
   * @template T
   * @param {ApiType.ApiMatterCreateOrder} params
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
   static matterCreateOrder<T>(params:ApiType.ApiMatterCreateOrder):Promise<T>{
    this.checkEnv();
    return this.axios.post<T>(
      {
        url: `${Api.matterOrderUrl}`,
        params:params.params,
      },
      params.options
    );
  }

  /**
   * @description  下单接口 获取参数
   *
   * @static
   * @template T
   * @param {ApiType.ApiPayOrderParams} {
   *     params,
   *     options,
   *   }
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
  static getPayorder<T>({
    params,
    options,
  }: ApiType.ApiPayOrderParams): Promise<T> {
    this.checkEnv()
      return this.axios.get<T>(
        {
          url: this.payOrderUrl(params),
        },
        options
      );
  }

  /**
   * @description  实物下单接口 获取参数
   *
   * @static
   * @template T
   * @param {ApiType.ApiMatterPayOrder} {
   *     params,
   *     options,
   *   }
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
   static matterGetPayorder<T>({params, options}:ApiType.ApiMatterPayOrder): Promise<T> {
    this.checkEnv()
      return this.axios.get<T>(
        {
          url: `${Api.matterPayOrderUrl}/${params.orderNo}/${params.payType}`,
          params: { endpoint: params.endpoint, openid: params.openid},
        },
        options
      );
  }

  /**
   * @description 支付方式列表
   *
   * @static
   * @template T
   * @param {ApiType.ApiPayWayListParams} params
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
   static getPayWayList<T>({params, options}:ApiType.ApiPayWayListParams):Promise<T>{
      this.checkEnv();
      return this.axios.get<T>(
        {
          url: `${Api.payWayList}`,
          params
        },
        options
      )
   }


   /**
   * @description 支付结果
   *
   * @static
   * @template T
   * @param {ApiType.ApiOrderDetailParams} params
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
    static getOrderDetail<T>({params, options}:ApiType.ApiOrderDetailParams):Promise<T>{
      this.checkEnv();
      return this.axios.get<T>(
        {
          url: `${Api.orderDetail}/${params.orderNo}`,
          params: {orderPartId: params.orderNo}
        },
        options
      );
    }


    /**
     * @description 用户是否购买过此课程
     *
     * @static
     * @template T
     * @param {ApiType.ApiUserCourseIsBuyParams} {params,options}
     * @return {*}  {Promise<T>}
     * @memberof PaySdk
     */
    static getUserCourseIsBuy<T>({params,options}:ApiType.ApiUserCourseIsBuyParams):Promise<T>{
      this.checkEnv();
      return this.axios.get<T>(
        {
          url: `${Api.courseBuyStatus}`,
          params
        },
        options
      );
    }


  /**
   * @description 下单完成调取支付
   *
   * @static
   * @template T
   * @param {ApiType.ApiPayOrderParams} {params, options}
   * @memberof PaySdk
   */
  static async payOrderType<T> ({params, options}: ApiType.ApiPayOrderParams){
    this.checkEnv();
      let data = await this.getPayorder<T>({params, options})
      if(typeof data === 'string'){
      this.pay({type:params.payType,payUrl:data})
    }else{
      this.pay({type:params.payType,...data})
    }
  }

  /**
   * @description 查询跳转的url
   *
   * @static
   * @template T
   * @param {ApiType.ApiDeskUrlParams} {params,options}
   * @return {*}  {Promise<T>}
   * @memberof PaySdk
   */
  static getDeskUrl<T>({params,options}:ApiType.ApiDeskUrlParams):Promise<T>{
    this.checkEnv();
    return this.axios.get<T>({
      url:`${Api.deskUrl}/${params.courseCode}/${params.sceneType}`
    },options)

  }

  /**
   * @description 支付接口url
   *
   * @private
   * @static
   * @param {ApiType.PayOrderParams} params
   * @return {*} 
   * @memberof PaySdk
   */
  private static payOrderUrl(params:ApiType.PayOrderParams){
    if (params.sell  && Number(params.sell) === 1) {
      let emi = params.emi ? `&emi=${params.emi}` : ''
      const baseUrl = `${Api.sellPayOrder}/${params.openid}/${params.orderNo}/${params.payType}?unionid=${params.unionid}&openid=${params.openid}&parts=${params.parts}&userId=${params.userId}&endpoint=${params.endpoint}${emi}`
      return baseUrl
    } else {
      const baseUrl =`${Api.payOrder}/${params.openid}/${params.orderNo}/${params.payType}`
      return params.emi ?setObjToUrlParams(baseUrl,{emi:params.emi,userId:params.userId}):baseUrl
    }
  }

  /**
   * @description 判断是否传env
   *
   * @private
   * @static
   * @memberof PaySdk
   */
  private static checkEnv(){
    if(!this.env){
      throw new Error('Before using, you must use the init method!')
    } else {
      LogInit(this.env)
    }
  }
}

export default PaySdk;
