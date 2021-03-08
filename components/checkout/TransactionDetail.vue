<template lang="pug">
    el-dialog.word-break-dialog(
        @close="pushToHome()"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        title="Detil Transaksi"
        :visible.sync="isVisible"
        width="420px")
            .title-transaction.text-center
                .text-success
                    i.d-block.far.fa-check-circle.fa-5x.text-center.i-btn-full-width
                    h3.mt-2.mb-2 Transaksi Berhasil
                p.mt-0.text-size-mini 
                    | Lanjutkan pembayaran dan kirim foto bukti pembayaran. "Untuk keamanan, jangan menunjukan bukti pembayaran kepihak manapun selain pihak Padiraharja melalui aplikasi"
            
            .detail-bank.border
                .border-bottom.p-3
                    h4.m-0 Transfer Bank: {{paymentData.bank_name}}
                .detail.p-3
                    .row.align-items-center.mt-2
                        .col
                            p.mt-0.mb-2.text-size-mini.font-weight-light Atas Nama:
                            p.mt-0.mb-2.font-weight-bold {{paymentData.account_name}}
                    .row.align-items-center
                        .col
                            p.mt-0.mb-2.text-size-mini.font-weight-light No. Rekening:
                            p.mt-0.mb-2.font-weight-bold {{paymentData.account_number}}
                        .col.text-right
                            a.red-link.text-size-mini.mb-2(href="javascript:void(0)" @click="copyText(paymentData.account_number)") Copy
                    .row.align-items-center
                        .col
                            p.mt-0.mb-2.text-size-mini.font-weight-light Total Pembayaran:
                            p.mt-0.mb-2.font-weight-bold Rp. {{totalOrder | price}}
                        .col.text-right
                            a.red-link.text-size-mini.mb-2(href="javascript:void(0)" @click="copyText(totalOrder)") Copy
                          
            .mt-3.text-right
                el-button(type="primary" @click="pushToHome()") Tutup
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    paymentData: {
      type: Object,
      default: null,
    },
    transactionData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit, root }) {
    const isVisible = computed({
      get: () => {
        return props.value
      },
      set: (val) => {
        emit('input', val)
      },
    })

    function pushToHome() {
      root.$router.push({ path: '/' })
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
        this.$notify.success({
          title: 'Success',
          message: 'Copied to clipboard',
        })
      } catch (err) {
        this.$notify.error({
          title: 'Error',
          message: 'Something went wrong',
        })
      }
      document.body.removeChild(element)
    }

    const totalOrder = computed(() => {
      return props.transactionData.amount + props.transactionData.unique_code
    })

    return {
      copyText,
      isVisible,
      pushToHome,
      totalOrder,
    }
  },
}
</script>

<style lang="scss">
.word-break-dialog {
  .el-dialog__body {
    word-break: break-word !important;
  }
}
</style>
