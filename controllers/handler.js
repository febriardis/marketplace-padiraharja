import { reactive } from '@nuxtjs/composition-api'
import api from '@/controllers/api'

export const handler = () => {
  const form = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null,
  })

  const postData = async (url, data) => {
    form.isLoading = true
    const response = await api.postData(url, data)
    if (response.status === 200 || response.status === 201) {
      form.isLoading = false
      form.isSuccess = true
    } else {
      form.isLoading = false
      form.isFailed = true
    }
    form.response = response.data
  }

  const putData = async (url, data) => {
    form.isLoading = true
    const response = await api.putData(url, data)
    if (response.status === 200 || response.status === 201) {
      form.isLoading = false
      form.isSuccess = true
    } else {
      form.isLoading = false
      form.isFailed = true
    }
    form.response = response
  }

  const patchData = async (url, data) => {
    form.isLoading = true
    const response = await api.patchData(url, data)
    if (response.status === 200 || response.status === 201) {
      form.isLoading = false
      form.isSuccess = true
    } else {
      form.isLoading = false
      form.isFailed = true
    }
    form.response = response
  }

  const deleteData = async (url, data) => {
    form.isLoading = true
    const response = await api.deleteData(url, data)
    if (response.status === 200 || response.status === 201) {
      form.isLoading = false
      form.isSuccess = true
    } else {
      form.isLoading = false
      form.isFailed = true
    }
    form.response = response
  }

  // fetch Data
  const result = reactive({
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    response: null,
  })

  const fetchData = async (url, data) => {
    result.isLoading = true
    const response = await api.fetchData(url, data)
    if (response.status === 200) {
      result.isLoading = false
      result.isSuccess = true
    } else {
      result.isLoading = false
      result.isFailed = true
    }
    result.response = response.data
  }

  return { form, postData, putData, deleteData, patchData, result, fetchData }
}
