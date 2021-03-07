<template lang="pug">
    .other-info
      h3.mb-0 Pesanan Anda
      .border-bottom.text-size-small.text-color-gray.mt-3
        .row.mb-3
          .col-8
            p.m-0 Total Harga ({{quantity}} Produk)
          .col-4.text-right
            p.m-0 Rp. {{productPrice | price}}
        .row.mb-3
          .col-8
            p.m-0 Biaya Pengiriman
          .col-4.text-right
            p.m-0 Rp. {{deliveryFee | price}}
      .row.text-size-small.border-bottom
        .col-6
          p.text-color-gray.font-weight-bold Total Tagihan
        .col-6.text-right
          p.font-weight-bold Rp. {{totalOrder | price}}

      .row.text-size-small.mt-3.mb-2
          .col-12
            slot
</template>

<script>
import { computed, reactive } from '@nuxtjs/composition-api'

export default {
  props: {
    quantity: {
      type: [Number, String],
      default: 0,
    },
    productPrice: {
      type: [Number, String],
      default: 0,
    },
    deliveryFee: {
      type: [Number, String],
      default: 0,
    },
  },
  setup(props) {
    const state = reactive({
      total: 0,
    })

    const totalOrder = computed(() => {
      return (
        parseInt(props.productPrice) * props.quantity +
        parseInt(props.deliveryFee)
      )
    })

    return {
      state,
      totalOrder,
    }
  },
}
</script>
