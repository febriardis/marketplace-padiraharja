<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih kecamatan", filterable, @change="selectDistrict", value-key="subdistrict_id", v-model="state.subdistrict")
        el-option(v-for="(item, key) in state.districts" :key="key" :label="item.subdistrict_name" :value="item")
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
    cityId: {
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
      districts: [],
      district: null,
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.districts = value.response.data
        }
      },
      { deep: true }
    )

    watch(
      () => props.cityId,
      (value) => {
        emit('input', null)
        if (value) {
          getDistricts(value)
        }
      }
    )

    function selectDistrict(data) {
      if (props.dataValue === 'object') {
        emit('input', data)
      } else {
        emit('input', data.subdistrict_id)
      }
    }

    function getDistricts(cityId) {
      fetchData(`/raja-ongkir/subdistrict/${cityId}`)
    }

    onMounted(() => {
      if (props.cityId) {
        getDistricts(props.cityId)
      }
    })

    return {
      state,
      result,
      selectDistrict,
    }
  },
}
</script>
