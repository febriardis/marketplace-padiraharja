<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih Kategori", filterable, value-key="id", v-model="innerValue")
        el-option(v-for="(item, key) in state.categories" :key="key" :label="item.name" :value="item.id")
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
  },
  setup(props, { emit }) {
    const { result, fetchData } = handler()
    const state = reactive({
      categories: [],
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.categories = value.response.data
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

    function getCategories() {
      fetchData('/public/product_category')
    }

    onMounted(() => {
      getCategories()
    })

    return {
      state,
      result,
      innerValue,
    }
  },
}
</script>
