<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih Provinsi", filterable, @change="selectProvince", value-key="province_id", v-model="state.province")
        el-option(v-for="(item, key) in state.provinces" :key="key" :label="item.province" :value="item")
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
    dataValue: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { result, fetchData } = handler()
    const state = reactive({
      provinces: [],
      province: null,
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

    function selectProvince(data) {
      if (props.dataValue === 'object') {
        emit('input', data)
      } else {
        emit('input', data.province_id)
      }
    }

    function getProvinces() {
      fetchData('/raja-ongkir/province')
    }

    onMounted(() => {
      getProvinces()
    })

    return {
      state,
      result,
      selectProvince,
    }
  },
}
</script>
