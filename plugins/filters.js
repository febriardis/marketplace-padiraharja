import Vue from 'vue'
import numeral from 'numeral'
import moment from 'moment'

Vue.filter('price', function (integer) {
  return numeral(integer).format('0,0')
})

Vue.filter('percentDigit', function (integer) {
  let num = 0
  if (integer > 0) {
    num =
      Math.round(integer) >= 100
        ? Math.round(integer)
        : parseFloat(integer).toFixed(2)
  }
  return num
})

Vue.filter('formatDate', (value, customFormat) => {
  return moment(value).format(customFormat || 'DD/MM/YYYY')
})

Vue.filter('lowercase', function (value) {
  if (!value) return ''
  return value.toString().toLowerCase()
})

Vue.filter('capitalize', function (value) {
  if (typeof value !== 'string') return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('compareDuration', (start, end) => {
  const dS = new Date(start)
  const dE = new Date(end)
  return moment(dE).diff(dS, 'seconds') - 7
})

Vue.filter('imageView', function (value) {
  const pathArray = value.split('/')
  const protocol = pathArray[0]
  if (protocol === 'https:') {
    return value
  } else {
    return `https://adminapi.emsacode.xyz/${value}`
  }
})

export default Vue.options.filters
Vue.prototype.$filters = Vue.options.filters
