<template lang="pug">
    .order-content.text-size-small
        .row.border-bottom
            .col
                p.mt-0.mb-2.font-weight-bold
                    | No. Order: {{ payload.order_id }}
            .col.text-right
                p.mt-0.mb-2.font-weight-light
                    | Tanggal Pesan: {{ payload.createdAt | formatDate }}
        .row.mt-2
            .col-md-3.border-right
              .d-flex.justify-content-between
                div
                  p
                      span.text-color-gray Fast Pants:
                      |   {{ payload.style ? payload.style.name : "" }}
                  p
                      span.text-color-gray Fabric:
                      |  {{ payload.fabric ? payload.fabric.name : "" }}
                  p
                      span.text-color-gray Stitch:
                      |  {{ payload.stitch ? payload.stitch.name : "" }}
                  p
                      span.text-color-gray Size:
                      |  {{ payload.size ? payload.size.size : "" }}
                  p
                      span.text-color-gray Cutting:
                      |  {{ payload.cutting ? payload.cutting.name : "" }}
                div
                  p.font-weight-bold x{{ payload.qty }}
            .col.text-center.border-right
                p {{ payload.user ? payload.user.name : "" }}
            .col.border-right
                p.text-color-gray.font-weight-bold.mb-1
                    | {{ payload.address ? payload.address.title : "" }}
                p.text-color-gray
                    | {{ payload.address ? payload.address.address : "" }}
                .text-size-mini.border-top.pt-2
                    p.m-0.mb-1 Expedisi:
                    p.m-0.font-weight-bold.text-uppercase {{ payload.logistic_info }}
                    p.mt-1.m-0.text-color-gray (Rp. {{ payload.logistic_charge | price }})
                    p.mt-2.text-color-gray(v-if="payload.logistic_awb")
                      | AWB: {{ payload.logistic_awb }}
            .col.text-center.border-right
                p.text-color-gray {{ payload.order_status }}
            .col.border-right
                p.text-center.font-weight-bold Rp. {{ payload.total_price | price }}
                .text-size-mini.border-top.pt-2
                  p.m-0.mb-1 Payment:
                  p.m-0.font-weight-bold.text-uppercase {{ payload.payment_bank }} VIRTUAL ACCOUNT
                  p.mt-1.m-0.text-color-gray VA Number: {{ payload.payment_va }}
                  p.mt-1.m-0.text-color-gray.text-capitalize Status: 
                    el-tag(size="mini" :type="payload.payment_status === 'pending' ? 'warning' : payload.payment_status === 'failure' ? 'danger' : 'success'")
                      | {{ payload.payment_status}}
                  p.mt-2.text-color-gray.text-capitalize(v-if="payload.payment_status !== 'success'")
                    | Exp. {{ parseInt(payload.payment_exp) | formatDate('HH:mm - DD/MM/YYYY') }}
            .col.text-center
                el-button.w-100(
                    v-if="payload.order_status === 'Sedang Dikirim'"
                    size='small' 
                    type='warning' 
                    plain
                    @click="handleOrder()"
                    ) Pesanan Diterima
                //- el-button.w-100.ml-0.mt-2(size='small' icon='el-icon-truck' v-if="status === '3' || status === '4'") Pantau Pengiriman

</template>

<script>
import { handler } from '@/controllers/handler'
import { watch } from '@nuxtjs/composition-api'

export default {
  props: {
    payload: {
      type: Object,
      default: null,
    },
    fetchOrders: {
      type: Function,
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    const { form: response, postData } = handler()

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          props.fetchOrders()
        }
      },
      { deep: true }
    )

    function handleOrder() {
      const _this = ctx.root
      _this
        .$confirm('Apakah anda yakin akan melakukan aksi ini?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
        .then(() => {
          postData(`/orders/${props.payload.id}/finish`)
        })
        .catch(() => {
          // console.log('cancel')
        })
    }

    return {
      response,
      handleOrder,
    }
  },
}
</script>

<style lang="scss">
.order-content {
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
