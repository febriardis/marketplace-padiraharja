<template lang="pug">
    el-dialog(
        title="Pembayaran"
        :visible.sync="isAddDialog"
        width="450px")
        el-form(
          :model="form"
          :rules="rules"
          ref="refForm"
          )
          el-form-item(prop="bank_id" label="Metode Pembayaran")
            SelectBankField(v-model="form.bank_id")
          .other-info.m-2
            p.font-weight-bold.mb-0 Ringkasan Pembayaran
            .row.text-size-small.border-bottom
              .col-6
                p.text-color-gray.font-weight-bold Total Tagihan
              .col-6.text-right
                p.font-weight-bold Rp. {{totalOrder | price}}
          .mt-3.text-right
            el-button(type="primary" @click="submitForm()" v-loading.fullscreen.lock="state.isLoading") Lanjutkan
</template>

<script>
import { computed, reactive, ref } from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    totalOrder: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const refForm = ref(null)
    const state = reactive({
      isLoading: false,
    })
    const form = reactive({
      bank_id: null,
    })
    const rules = reactive({
      bank_id: [
        {
          required: true,
          message: 'Please select payment method',
          trigger: 'change',
        },
      ],
    })
    const isAddDialog = computed({
      get: () => {
        return props.value
      },
      set: (val) => {
        emit('input', val)
      },
    })
    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          state.isLoading = true
          emit('change', form.bank_id)
          emit('input', false)
          state.isLoading = false
        }
      })
    }

    return {
      state,
      form,
      rules,
      refForm,
      submitForm,
      isAddDialog,
    }
  },
}
</script>
