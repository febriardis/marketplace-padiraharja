<template lang="pug">
    el-select.w-100(:loading="result.isLoading", v-bind="$attrs" placeholder="Pilih Bank", filterable, value-key="id", v-model="innerValue")
        el-option(
          v-for="(item, key) in state.banks" 
          :key="key" 
          :label="isWithdraw ? `${item.bank_name} (a.n. ${item.account_name})` : item.bank_name" 
          :value="isWithdraw ? item.id : item")
</template>

<script>
import { computed, onMounted, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
export default {
  props: {
    value: {
      type: [Object, Number],
      default: null,
    },
    isWithdraw: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { result, fetchData } = handler()
    const state = reactive({
      banks: [],
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.banks = value.response.data
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

    function fetchBanks() {
      const url = props.isWithdraw ? '/user_bank' : '/public/payment_method'
      fetchData(url)
    }

    onMounted(() => {
      fetchBanks()
    })

    return {
      state,
      result,
      innerValue,
    }
  },
}
</script>
