<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih kota", filterable, @change="selectCity", value-key="city_id", v-model="state.city")
        el-option(v-for="(item, key) in state.cities" :key="key" :label="`${item.type} ${item.city_name}`" :value="item")
</template>

<script>
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
export default {
  props: {
    value: {
      type: [String, Object],
      default: null,
    },
    provinceId: {
      type: String,
      default: null,
    },
    dataValue: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { result, fetchData } = handler()
    const state = reactive({
      cities: [],
      city: null,
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.cities = value.response.data
        }
      },
      { deep: true }
    )

    watch(
      () => props.provinceId,
      (value) => {
        emit('input', null)
        if (value) {
          getCities(value)
        }
      }
    )

    function selectCity(data) {
      if (props.dataValue === 'object') {
        emit('input', data)
      } else {
        emit('input', data.city_id)
      }
    }

    function getCities(provinceId) {
      fetchData(`/raja-ongkir/city/${provinceId}`)
    }

    onMounted(() => {
      if (props.provinceId) {
        getCities(props.provinceId)
      }
    })

    return {
      state,
      result,
      selectCity,
    }
  },
}
</script>
