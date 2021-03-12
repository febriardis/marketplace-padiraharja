<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih kecamatan", filterable, value-key="id", v-model="innerValue")
        el-option(v-for="(item, key) in state.vilages" :key="key" :label="item.name" :value="item.id")
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
    districtId: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { result, fetchData } = handler()
    const state = reactive({
      vilages: [],
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.vilages = value.response.data
        }
      },
      { deep: true }
    )

    watch(
      () => props.districtId,
      (value) => {
        innerValue.value = null
        if (value) {
          getVilages(value)
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

    function getVilages(districtId) {
      fetchData(`/public/village/${districtId}`)
    }

    onMounted(() => {
      if (props.districtId) {
        getVilages(props.districtId)
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
