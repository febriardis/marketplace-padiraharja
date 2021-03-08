<template lang="pug">
    el-dialog(
        title="Penarikan Ke Rekening Bank"
        :visible.sync="isDialog"
        width="450px")
        el-form(
            :model="form"
            :rules="rules"
            ref="refForm"
            )
            el-form-item(prop="amount" label="Nominal")
                el-input-number.custom-number(v-model="form.amount" :min="50000" :controls="false" placeholder="Masukkan nominal (Min. Rp. 50.000)")
            el-form-item(prop="user_bank_id" label="Bank Tujuan")
                SelectBankWField(v-model="form.user_bank_id")
            .mt-3.text-right
                el-button(type="primary" @click="submitForm()" v-loading.fullscreen.lock="response.isLoading") Submit

</template>

<script>
import { handler } from '@/controllers/handler'
import { computed, reactive, ref, watch } from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { form: response, postData } = handler()

    const form = reactive({
      amount: null,
      user_bank_id: null,
    })

    const rules = reactive({
      amount: [
        {
          required: true,
          message: 'Please input nominal',
          trigger: 'change',
        },
      ],
      user_bank_id: [
        {
          required: true,
          message: 'Please select bank',
          trigger: 'change',
        },
      ],
    })

    const refForm = ref(null)

    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          postData('/withdraw', form)
        }
      })
    }

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          emit('input', false)
          emit('change')
        }
      },
      { deep: true }
    )

    const isDialog = computed({
      get: () => {
        return props.value
      },
      set: (val) => {
        emit('input', val)
      },
    })

    return {
      form,
      rules,
      refForm,
      submitForm,
      response,
      isDialog,
    }
  },
}
</script>

<style lang="scss">
.custom-number {
  width: 100%;
  .el-input {
    input {
      text-align: left;
    }
  }
}
</style>
