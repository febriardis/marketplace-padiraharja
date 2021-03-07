import { reactive } from '@nuxtjs/composition-api'
import api from '@/controllers/api'

export const utilities = () => {
  const collectArrayOfKey = (value, key) => {
    if (value.length !== 0) {
      const array = []
      for (let i = 0; i < value.length; i++) {
        const element = value[i]
        array.push(element[key])
      }
      return array
    } else {
      return []
    }
  }

  // couriers
  const couriers = reactive({
    isLoading: false,
    isFailed: false,
    list: [],
  })

  const fetchCouriers = async () => {
    couriers.isLoading = true
    const response = await api.fetchData('/public/courier')
    if (response.status === 200) {
      couriers.list = response.data.data
      couriers.isLoading = false
    } else {
      couriers.list = []
      couriers.isLoading = false
    }
  }

  return {
    couriers,
    fetchCouriers,
    collectArrayOfKey,
  }
}
