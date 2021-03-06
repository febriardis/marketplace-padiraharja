<template lang="pug">
    .order-content.text-size-small
        .row.border-bottom
            .col
                p.mt-0.mb-2.font-weight-bold
                    | No. Order: {{ payload.order_id }}
            .col.text-right
                p.mt-0.mb-2.font-weight-light
                    | Tanggal Pesan: {{ payload.createdAt | formatDate }}
        .detail-order.mt-2
            .border-bottom
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
            .border-bottom
              p.text-color-gray Total Order: Rp. {{ payload.total_price | price }}
            .border-bottom
              p.text-color-gray Status: {{ payload.order_status }}
            .border-bottom.mt-2(v-if="payload.order_status === 'Sedang Dikirim'")
                el-button.w-100(
                    size='small' 
                    type='warning' 
                    plain
                    @click="handleOrder()"
                    ) Pesanan Diterima
        el-collapse(v-model="state.activeDetail")
          el-collapse-item(title="Detil Order" name="1")
            .border-bottom
                p.mb-0 Pemesan: {{ payload.user ? payload.user.name : "" }}
            .border-bottom
                p.mt-0.mb-1 Dikirim ke
                p.text-color-gray.font-weight-bold.m-0.mb-1
                    | {{ payload.address ? payload.address.title : "" }}
                p.text-color-gray.m-0
                    | {{ payload.address ? payload.address.address : "" }}
                .text-size-mini.border-top.pt-2
                    p.m-0.mb-1 Expedisi:
                    p.m-0.font-weight-bold.text-uppercase {{ payload.logistic_info }}
                    p.mt-1.m-0.text-color-gray (Rp. {{ payload.logistic_charge | price }})
                    p.mt-2.text-color-gray(v-if="payload.logistic_awb")
                      | AWB: {{ payload.logistic_awb }}
            .payment-detail
                p.font-weight-bold Total Order: Rp. {{ payload.total_price | price }}
                .text-size-mini.border-top.pt-2
                  p.m-0.mb-1 Payment:
                  p.m-0.font-weight-bold.text-uppercase {{ payload.payment_bank }} VIRTUAL ACCOUNT
                  p.mt-1.m-0.text-color-gray VA Number: {{ payload.payment_va }}
                  p.mt-1.m-0.text-color-gray.text-capitalize Status: 
                    el-tag(size="mini" :type="payload.payment_status === 'pending' ? 'warning' : payload.payment_status === 'failure' ? 'danger' : 'success'")
                      | {{ payload.payment_status}}
                  p.m-0.mt-2.text-color-gray.text-capitalize(v-if="payload.payment_status !== 'success'")
                    | Exp. {{ parseInt(payload.payment_exp) | formatDate('HH:mm - DD/MM/YYYY') }}
            
</template>

<script>
import { handler } from '@/controllers/handler'
import { watch, reactive } from '@nuxtjs/composition-api'

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

    const state = reactive({
      activeDetail: '',
    })

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
      state,
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
