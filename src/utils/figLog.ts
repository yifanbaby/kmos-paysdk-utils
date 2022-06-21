import Log from "@base/fig-log";

export const LogInit = (env: string) => {
  Log.init({
    app_id: 'a2f40a51369b4bda9031c3e0d64a6514',
    env: env
  })
}

const getPrarams = (method: string, data: any, params: any) => {
  if (method === 'get' && params) {
    return params
  } else if (method === 'post' && data) {
    return data
  } else {
    return '无需参数'
  }
}

export const apiError = (responseData: any) => {
  try {
    const { method, data, params} = responseData.config // data: post请求参数  params: get请求参数
    Log.apiInfo({
      title: '收银台接口异常通知',
      responseStatusCode: responseData.status,
      requestMethod: method,
      requestPath: responseData.request.responseURL,
      requestParams: getPrarams(method, data, params),
      responseContent: JSON.stringify(responseData.data)
    })
    // Log.report({
    //   type: 'apiError', // 固定
    //   title: '收银台：接口异常',
    //   content: '日志上报-详细内容',
    //   apiInfo: {
    //     response_status_code: responseData.status,
    //     request_method: method,
    //     request_path: responseData.request.responseURL,
    //     request_params: getPrarams(method, data, params),
    //     response_content: JSON.stringify(responseData.data)
    //   }
    // })
  } catch (e) {
    console.log(e)
  }
}

export const logReporting = (data: any) => {
  try {
    Log.report({
      type: 'other',
      title: data.title,
      content: data.content, // 如果要使用json，请使用JSON.stringify(obj)
      notice: true, // 是否发送钉钉通知
      other: { msg: data.data },
    });
  } catch (e) {
    console.log(e)
  }
}
