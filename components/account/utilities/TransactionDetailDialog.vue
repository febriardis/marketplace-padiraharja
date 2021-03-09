<template lang="pug">
    el-dialog(
        title="Detail Transaksi"
        :visible.sync="isVisible"
        width="450px")
        .transaction-detail(v-if="payload")
          .detail
            .row
              .col
                .store
                  p.mt-0.mb-1.text-color-gray.text-size-mini Nama Toko
                  p.mt-0.mb-2.font-weight-bold {{payload.merchant.name}}
                .store
                  p.mt-0.mb-1.text-color-gray.text-size-mini Status Pesanan
                  p.mt-0.mb-2.font-weight-bold.text-capitalize.text-warning {{payload.status.replace(/_/g, " ") | lowercase}}
              .col
                .store
                  p.mt-0.mb-1.text-color-gray.text-size-mini Tanggal Pembelian
                  p.mt-0.mb-2.font-weight-bold {{ payload.createdAt | formatDate('DD MMM YYYY HH:mm') }}
            
          .order-datas.border-top.pt-3.mt-2
            p.mt-0.mb-1.text-color-gray.text-size-mini Daftar Produk
            .row.mt-2.pb-1(v-for="(product, key) in payload.detail" :class="{'border-bottom' : key < payload.detail.length - 1}" :key="key")
              .col
                .d-flex
                  .product-image.mr-3
                      img(:src="product.product.photo" width="50" height="50")
                  .product-detail.w-100
                    p.font-weight-bold.m-0 {{product.product.name}}
                    p.m-0.text-size-mini.text-color-gray {{product.quantity}} Pcs
              .col-3.text-right
                p.m-0.text-price Rp. {{product.product.price | price}}

          .payment-detail.border-top.pt-3.mt-2
            p.mt-0.mb-2.text-color-gray.text-size-mini Pembayaran
            .detail-bank.border.mt-2(v-if="payload.status === 'WAITING_PAYMENT' && payload.payment_method")
              .border-bottom.p-3
                h4.m-0 Transfer Bank: {{ payload.payment_method.bank_name}}
              .detail.p-3.pt-2.pb-2
                  .row.align-items-center.mt-2
                      .col
                          p.mt-0.mb-2.text-size-mini.font-weight-light Atas Nama:
                          p.mt-0.mb-2.font-weight-bold {{payload.payment_method.account_name}}
                  .row.align-items-center
                      .col
                          p.mt-0.mb-2.text-size-mini.font-weight-light No. Rekening:
                          p.mt-0.mb-2.font-weight-bold {{payload.payment_method.account_number}}
                      .col.text-right
                          a.red-link.text-size-mini.mb-2(href="javascript:void(0)" @click="copyText(payload.payment_method.account_number)") Copy
                  .row.align-items-center
                      .col
                          p.mt-0.mb-2.text-size-mini.font-weight-light Total Pembayaran:
                          p.mt-0.mb-2.font-weight-bold Rp. {{payload.amount + payload.unique_code | price}}
                      .col.text-right
                          a.red-link.text-size-mini.mb-2(href="javascript:void(0)" @click="copyText(payload.amount + payload.unique_code)") Copy
            
            .payed(v-else)
              .row.text-size-mini.font-weight-light
                .col
                  p.mt-0.mb-2 Total Harga Produk:
                  p.mt-0.mb-2 Total Ongkos Kirim:
                  p.mt-0.mb-2 Total Pembayaran:
                  p.mt-0.mb-2 Metode Pembayaran:
                .col-3
                  p.mt-0.mb-2 Rp. {{payload.amount - payload.postal_fee | price}}
                  p.mt-0.mb-2 Rp. {{payload.postal_fee | price}}
                  h3.mt-0.mb-2.text-price Rp. {{payload.amount | price}}
                  p.mt-0.mb-2 Transfer ke {{ payload.payment_method ? payload.payment_method.bank_name : null}}
              
        .mt-3.text-right
            el-button(type="primary" @click="isVisible = false") Tutup

</template>

<script>
import { computed } from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    payload: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const isVisible = computed({
      get: () => {
        return props.value
      },
      set: (val) => {
        emit('input', val)
      },
    })

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

    return {
      isVisible,
      copyText,
    }
  },
}
</script>
