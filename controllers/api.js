import Vue from 'vue'
import _ from 'lodash'
import { Message } from 'element-ui'
import { HTTP } from '../plugins/axios'

const _baseUrl = 'http://api.emsacode.xyz' // process.env.VUE_APP_API_REQUEST_URL_MIGRATE;
const _send = async (
  method = 'GET',
  url,
  params = null,
  data = null
  // headers
) => {
  try {
    let headers
    if (localStorage.getItem('token')) {
      headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    }
    const response = await HTTP({
      headers,
      method,
      url: _baseUrl + url,
      params,
      data,
    })

    if (method.toLocaleLowerCase() !== 'get') {
      if (response.data.status) {
        Message({
          type: 'success',
          message: response.data.status,
        })
      }
    }
    return response
  } catch (error) {
    const data = error.response
    if (data && data.status) {
      if (data.status === 401) {
        localStorage.removeItem('token')
      } else if (data.status === 400) {
        if (!_.isEmpty(data.data.errors)) {
          _.forEach(data.data.errors, (data) => {
            Message({
              type: 'warning',
              message: data,
            })
          })
        } else {
          Message({
            type: 'warning',
            message: data.data.message,
          })
        }
      } else {
        Message({
          type: 'warning',
          message: data.data.message,
        })
      }
    } else {
      Message.error('Oops, something wrong')
    }
    return false
  }
}

// List api
const apiList = {
  fetchData: async (url, params) => {
    return await _send('GET', url, params)
  },
  postData: async (url, data) => {
    return await _send('POST', url, null, data)
  },
  putData: async (url, data) => {
    return await _send('PUT', url, null, data)
  },
  patchData: async (url, data) => {
    return await _send('PATCH', url, null, data)
  },
  deleteData: async (url, data) => {
    return await _send('DELETE', url, null, data)
  },

  //   exGEtData: async params => {
  //     return await _send("GET", "/v0.0.0/business/groups", params);
  //   },
  //   exGEtDataID: async businessId => {
  //     return await _send("GET", `/v0.0.0/accounts/business/${businessId}/me`);
  //   },
  //   exPostData: async data => {
  //     return await _send("POST", "/v0.0/forgot-password/reset-password", data);
  //   },
  //   exPutData: async (id, data) => {
  //     return await _send("PUT", `/v0.0.0/accounts/me/${id}`, null, data);
  //   },
  //   exDeleteData: async (id, params) => {
  //     return await _send("DELETE", `/v0.0.0/accounts/me/${id}`, params);
  //   },
}

export default apiList
Vue.prototype.$api = apiList
