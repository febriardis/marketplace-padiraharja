<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih kecamatan", filterable, value-key="id", v-model="innerValue")
        el-option(v-for="(item, key) in state.districts" :key="key" :label="item.name" :value="item.id")
</template>

<script>
import { computed, onMounted, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
    cityId: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { result, fetchData } = handler()
    const state = reactive({
      districts: [],
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
        innerValue.value = null
        if (value) {
          getDistricts(value)
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

    function getDistricts(cityId) {
      fetchData(`/public/district/${cityId}`)
    }

    onMounted(() => {
      if (props.cityId) {
        getDistricts(props.cityId)
      }
    })

    return {
      state,
      result,
      innerValue,
    }
  },
}
</script>
