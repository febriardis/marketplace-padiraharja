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

  // styles
  const styles = reactive({
    isLoading: false,
    isFailed: false,
    list: [],
  })

  const fetchStyles = async () => {
    styles.isLoading = true
    const response = await api.fetchData('/styles')
    if (response.status === 200) {
      styles.list = response.data.data
      styles.isLoading = false
    } else {
      styles.list = []
      styles.isLoading = false
    }
  }

  // style by id
  const styleDetail = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null,
  })

  const fetchStylesById = async (stylesId) => {
    styleDetail.isLoading = true
    const response = await api.fetchData(`/styles/${stylesId}`)
    if (response.status === 200) {
      styleDetail.isLoading = false
      styleDetail.isSuccess = true
    } else {
      styleDetail.isLoading = false
      styleDetail.isFailed = true
    }
    styleDetail.response = response.data
  }

  // fabrics by id
  const fabrics = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null,
  })

  const fetchFabricsById = async (fabricsId) => {
    fabrics.isLoading = true
    const response = await api.fetchData(`/fabrics/${fabricsId}`)
    if (response.status === 200) {
      fabrics.isLoading = false
      fabrics.isSuccess = true
    } else {
      fabrics.isLoading = false
      fabrics.isFailed = true
    }
    fabrics.response = response.data
  }

  // stitches by id
  const stitches = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null,
  })

  const fetchStitchesById = async (stitchesId) => {
    stitches.isLoading = true
    const response = await api.fetchData(`/stitches/${stitchesId}`)
    if (response.status === 200) {
      stitches.isLoading = false
      stitches.isSuccess = true
    } else {
      stitches.isLoading = false
      stitches.isFailed = true
    }
    stitches.response = response.data
  }

  // cuttings by id
  const cuttings = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null,
  })

  const fetchCuttingsById = async (cuttingsId) => {
    cuttings.isLoading = true
    const response = await api.fetchData(`/cuttings/${cuttingsId}`)
    if (response.status === 200) {
      cuttings.isLoading = false
      cuttings.isSuccess = true
    } else {
      cuttings.isLoading = false
      cuttings.isFailed = true
    }
    cuttings.response = response.data
  }

  // sizes by id
  const sizes = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null,
  })

  const fetchSizesById = async (sizesId) => {
    sizes.isLoading = true
    const response = await api.fetchData(`/sizes/${sizesId}`)
    if (response.status === 200) {
      sizes.isLoading = false
      sizes.isSuccess = true
    } else {
      sizes.isLoading = false
      sizes.isFailed = true
    }
    sizes.response = response.data
  }

  // couriers
  const couriers = reactive({
    isLoading: false,
    isFailed: false,
    list: [],
  })

  const fetchCouriers = async () => {
    couriers.isLoading = true
    const response = await api.fetchData('/couriers', { enabled: true })
    if (response.status === 200) {
      couriers.list = response.data.data
      couriers.isLoading = false
    } else {
      couriers.list = []
      couriers.isLoading = false
    }
  }

  // styles
  const paid = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null,
  })

  const postPaid = async (data) => {
    paid.isLoading = true
    const response = await api.submitData('/orders/pay', data)
    if (response.status === 200) {
      paid.response = response.data
      paid.isLoading = false
      paid.isSuccess = true
    } else {
      paid.response = null
      paid.isSuccess = false
      paid.isLoading = false
    }
  }

  return {
    collectArrayOfKey,
    styles,
    fetchStyles,
    styleDetail,
    fetchStylesById,
    fabrics,
    fetchFabricsById,
    stitches,
    fetchStitchesById,
    cuttings,
    fetchCuttingsById,
    sizes,
    fetchSizesById,
    couriers,
    fetchCouriers,
    paid,
    postPaid,
  }
}
