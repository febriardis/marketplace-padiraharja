<template lang="pug">
    el-dialog(
        :title="`${bankData ? 'Edit' : 'Tambah'} Produk`"
        :visible.sync="isDialog"
        width="500px")
        el-form(
            :model="form"
            :rules="rules"
            ref="refForm"
            )
            el-form-item(prop="bank_name" label="Nama Bank")
                el-input(type="text" v-model="form.bank_name" placeholder="Masukkan nama bank")
            el-form-item(prop="account_name" label="Nama Pemilik")
                el-input(type="text" v-model="form.account_name" placeholder="Masukkan nama pemilik")
            el-form-item(prop="account_number" label="Nomor Rekening")
                el-input(type="text" v-model="form.account_number" placeholder="Masukkan nomor rekening")
            .mt-3.text-right
                el-button(type="primary" @click="submitForm()" v-loading.fullscreen.lock="response.isLoading") Simpan

</template>

<script>
import { handler } from '@/controllers/handler'
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    bankData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { form: response, postData, putData } = handler()

    const form = reactive({
      bank_name: null,
      account_name: null,
      account_number: null,
    })

    const rules = reactive({
      bank_name: [
        {
          required: true,
          message: 'Please input bank name',
          trigger: 'change',
        },
      ],
      account_name: [
        {
          required: true,
          message: 'Please input account name',
          trigger: 'change',
        },
      ],
      account_number: [
        {
          required: true,
          message: 'Please input account number',
          trigger: 'change',
        },
      ],
    })

    const refForm = ref(null)

    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          if (!props.bankData) {
            postData('/user_bank', form)
          } else {
            putData(`/user_bank/${props.bankData.id}`, form)
          }
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

    onMounted(() => {
      const bank = props.bankData
      if (bank) {
        form.bank_name = bank.bank_name
        form.account_name = bank.account_name
        form.account_number = bank.account_number
      }
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
