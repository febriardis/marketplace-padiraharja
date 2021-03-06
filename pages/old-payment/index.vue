<template lang="pug">
    .payment-detail
        .card-custom.p-1.pl-3.mt-3
            h3 Pilih Metode Pembayaran
        .card-custom.p-1.pl-3.mt-3
            p.font-weight-bold.mb-4 Bank Transfer / Virtual Account
            el-form(
                :model="form"
                :rules="rules"
                ref="refForm"
                )
                    el-form-item(prop="bank")
                        .clear
                        el-radio-group(v-model="form.bank" size="small" style="display:grid")
                            el-radio.mb-3.pb-3.border-bottom(v-for="(item, i) in state.paymentMethods" :key="i" :label="item.value")
                                | {{item.label}}

                    .text-right.p-3
                        el-button.mt-3(
                            type="primary"
                            :loading="state.isLoading"
                            v-loading.fullscreen.lock="response.isLoading"
                            @click="submitForm()")
                            | Proses Pembayaran

        el-dialog(
            title="Detil Pembayaran"
            :visible.sync="state.isDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            width="600px"
            custom-class="dialog-body-pad-0")
            .content(v-if="state.paymentDetail")
                el-alert(type="success" :title="state.paymentDetail.status_message")
                h4 Silahkan lakukan pembayaran secepatnya sebelum stok habis.
                p.m-0.mb-2.text-size-mini.text-color-gray Metode pembayaran:
                h3.m-0.mb-2.text-capitalize {{form.bank}} Virtual Account
                p.m-0.mb-2 
                    span.text-color-gray Jumlah: 
                    | {{state.paymentDetail.currency}} {{state.paymentDetail.gross_amount}}
                p.m-0
                    span.text-color-gray Nomor VA: 
                    span(id="va-number") {{ state.vaNumber }}
                .mt-3
                    el-button(size="mini" type="warning" @click="copyText(state.vaNumber)") Copy VA Number

            span(slot="footer" class="dialog-footer")
                el-button(size="small" type="success" plain @click="$router.push('/')") OKE
</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, ref, watch } from '@nuxtjs/composition-api'

export default {
  setup(_, ctx) {
    const { form: response, postData, result, fetchData } = handler()

    const state = reactive({
      isDialog: false,
      paymentDetail: null,
      vaNumber: null,
      paymentMethods: [
        { value: 'bca', label: 'BCA Virtual Account' },
        { value: 'bni', label: 'BNI Virtual Account' },
        { value: 'bri', label: 'BRI Virtual Account' },
        { value: 'permata', label: 'Permata Virtual Account' },
      ],
    })

    const rules = reactive({
      bank: [
        {
          required: true,
          message: 'Please choose payment method',
          trigger: 'blur',
        },
      ],
    })

    const form = reactive({
      order_id: null,
      bank: null,
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          form.order_id = value.response.data.id
        }
      },
      { deep: true }
    )

    function fetchDetailOrder() {
      const query = ctx.root.$route.query
      fetchData(`/orders/${query.order_id}`)
    }

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          state.isDialog = true
          state.paymentDetail = value.response.data
          state.vaNumber =
            state.paymentDetail.va_numbers &&
            state.paymentDetail.va_numbers.length > 0
              ? state.paymentDetail.va_numbers[0].va_number
              : state.paymentDetail.permata_va_number
        }
      },
      { deep: true }
    )

    const refForm = ref(null)

    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          postData('/orders/pay', form)
        }
      })
    }

    function copyText(value) {
      const element = document.createElement('input')
      element.setAttribute('id', 'temporary_value')
      element.setAttribute('value', value)
      element.setAttribute('readonly', '')
      element.style.position = 'absolute'
      element.style.left = '-9999px'

      document.body.appendChild(element)

      const input = document.getElementById('temporary_value')
      input.select()

      try {
        document.execCommand('copy')
      } catch (err) {
        // eslint-disable-next-line
        console.log(err)
      }

      document.body.removeChild(element)
    }

    onMounted(() => {
      fetchDetailOrder()
    })

    return {
      rules,
      state,
      form,
      result,
      submitForm,
      response,
      refForm,
      copyText,
    }
  },

  head: () => ({
    title: 'Payment - Padiraharja',
  }),
}
</script>
