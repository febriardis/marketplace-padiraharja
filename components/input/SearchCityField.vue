<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih kota", filterable, value-key="id", v-model="innerValue")
        el-option(v-for="(item, key) in state.cities" :key="key" :label="item.name" :value="item.id")
</template>

<script>
import { computed, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
    provinceId: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { result, fetchData } = handler()
    const state = reactive({
      cities: [],
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
        innerValue.value = null
        if (value) {
          getCities(value)
        }
      }
    )

    const innerValue = computed({
      get: () => {
        return props.value
      },
      set(newValue) {
        emit('input', newValue)
      },
    })

    function getCities(provinceId) {
      fetchData(`/public/city/${provinceId}`)
    }

    return {
      state,
      result,
      innerValue,
    }
  },
}
</script>
