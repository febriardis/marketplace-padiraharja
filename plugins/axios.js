import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'

const HTTP = axios.create({
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded"
  },
})

// before a request is made start the nprogress
HTTP.interceptors.request.use((config) => {
  return config
})

// before a response is returned stop nprogress
HTTP.interceptors.response.use(
  (response) => {
    // success interceptor
    if (response.status === 200 || response.status === 404) {
      return response
    } else {
      // auto logout
      // eslint-disable-next-line no-lonely-if
      if (response && response.status === 401) {
        localStorage.removeItem('token')
        // push only if not in login page
        if (Router.currentRoute.fullPath !== '/') {
          Router.push('/')
        }
      }
    }

    const error = {}
    error.response = response
    return Promise.reject(error)
  },
  (error) => {
    // error interceptor
    const data = error.response
    // auto logout
    if (data && data.status === 401) {
      localStorage.removeItem('token')
      // push only if not in login page
      if (Router.currentRoute.fullPath !== '/') {
        Router.push('/')
      }
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = HTTP
export { HTTP }
