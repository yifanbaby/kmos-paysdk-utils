import PaySdk from '../init';
import {
  ApiCourseDetail,
  ApiCourseDetailResult,
  ApiPayOrderParams,
} from './model';

import { PayAllProps } from '../pay/payType';

const defHttp = PaySdk.createAxiosFn();
enum Api {
  courseDetail = '/vipcourse',
  payOrder = '/vipcourse/payorder',
  createOrder = '/vipcourse/order'
}
// open2
/**
 * @desc 获取课程详情
 *
 * @param {ApiCourseDetail} {
 *   params,
 *   onError,
 * }
 * @return {*}  {Promise<ApiCourseDetailResult>}
 */
export const getCourseDetail = ({
  params,
  options,
}: ApiCourseDetail): Promise<ApiCourseDetailResult> => {
  return defHttp.get<ApiCourseDetailResult>(
    {
      url: `${Api.courseDetail}/${params.courseCode}/${params.channelCode}`,
      params: { openid: params.openid, unionid: params.unionid },
    },
    options
  );
};

/**
 * @desc 下单
 *
 * @param {ApiPayOrderParams} { params, onError }
 * @return {*}  {Promise<PayAllProps>}
 */
export const getPayorder = ({
  params,
  options,
}: ApiPayOrderParams): Promise<PayAllProps> => {
  return defHttp.get<PayAllProps>(
    {
      url: `${Api.payOrder}/${params.openid}/${params.orderNo}/${params.payType}`,
    },
    options
  );
};
