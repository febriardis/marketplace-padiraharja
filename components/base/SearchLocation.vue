<template lang="pug">
    el-select.w-100(:loading="result.isLoading", placeholder="Ketik untuk mencari kota", remote, filterable, :remote-method="getLocations", @change="selectLocation", value-key="city_id", v-model="state.district")
        el-option(v-for="item in state.cities" :key="item.city_id" :label="`${item.type} ${item.city_name}, ${item.province}`" :value="item")
</template>

<script>
import { reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
  },
  setup(_, ctx) {
    const { result, fetchData } = handler()
    const state = reactive({
      cities: [],
      district: null,
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

    function selectLocation(selected) {
      this.$emit('input', parseInt(selected.city_id))
    }

    function getLocations(search) {
      if (search.length >= 3) {
        fetchData('/addresses/cities', {
          city: ctx.root.$filters.capitalize(search),
        })
      }
    }

    return {
      state,
      result,
      selectLocation,
      getLocations,
    }
  },
}
</script>
