<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih Provinsi", filterable, value-key="id", v-model="innerValue")
        el-option(v-for="(item, key) in state.provinces" :key="key" :label="item.province" :value="item.province_id")
</template>

<script>
import { computed, onMounted, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { result, fetchData } = handler()
    const state = reactive({
      provinces: [],
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.provinces = value.response.data
        }
      },
      { deep: true }
    )

    const innerValue = computed({
      get: () => {
        return props.value
      },
      set(newValue) {
        emit('input', newValue)
      },
    })

    function getProvinces() {
      fetchData('/raja-ongkir/province')
    }

    onMounted(() => {
      getProvinces()
    })

    return {
      state,
      result,
      innerValue,
    }
  },
}
</script>
