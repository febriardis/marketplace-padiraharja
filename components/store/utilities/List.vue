<template lang="pug">
    .order-content.text-size-small
        .row.border-bottom.align-items-center.pb-2
            .col
                p.mt-0.mb-1.font-weight-bold {{ payload.user.name }}
                p.m-0.text-size-mini.text-capitalize.text-color-gray {{ payload.user.city.name | lowercase }}
            .col.text-right
                p.m-0.font-weight-light
                    | Tanggal Pesan: {{ payload.createdAt | formatDate }}
        .row
            .col-md-3.border-right
              .d-flex.border-bottom.pt-2(v-for="(product, key) in payload.detail")
                .product-image.mr-3
                    img(:src="product.product.photo" width="50" height="50")
                .product-detail.w-100
                  p.m-0.mb-1.font-weight-bold {{product.product.name}}
                  p.m-0.mb-1.text-size-mini.text-color-gray {{product.quantity}} Pcs
                  p.m-0.mb-1.text-price Rp. {{product.product.price | price}}

            .col.border-right
                p.text-color-gray(v-if="payload.destination_details")
                  | {{  payload.destination_details.address }},
                  br
                  | {{  payload.destination_details.subdistrict_name }},
                  | {{  payload.destination_details.type + ' ' + payload.destination_details.city }},
                  | {{  payload.destination_details.province }}.
                .text-size-mini.border-top.pt-2
                    p.m-0.mb-1 Expedisi:
                    p.m-0.font-weight-bold.text-uppercase {{ payload.courier + '-' + payload.courier_service }}
                    p.mt-1.m-0.text-color-gray (Rp. {{ payload.postal_fee | price }})
                    p.mt-2.text-color-gray(v-if="payload.airway_bill")
                      | AWB: {{ payload.airway_bill }}
            .col.text-center.border-right
                p.text-capitalize.text-warning.font-weight-bold
                  | {{payload.status.replace(/_/g, " ") | lowercase}}
            .col.border-right
                p.text-center.font-weight-bold Rp. {{payload.amount + payload.postal_fee + payload.unique_code | price}}
                .text-size-mini.border-top.pt-2(v-if="payload.payment_method")
                  p.m-0.mb-1 Pembayaran Ke:
                  p.m-0.font-weight-bold Transfer Bank {{ payload.payment_method.bank_name }}
                  p.mt-1.m-0.text-color-gray {{ payload.payment_method.account_name }}
                  p.mt-1.m-0.text-color-gray {{ payload.payment_method.account_number }}
            .col.text-center.pt-3
                .requested-status(v-if="payload.status === 'REQUESTED'")
                  el-button.w-100(
                    type="primary"
                    size="small"
                    @click="handleOrder('process')"
                    ) Proses Pesanan
                  el-button.w-100.m-0.mt-2(
                    type="primary"
                    size="small"
                    plain
                    @click="handleOrder('reject')"
                    ) Tolak Pesanan

                el-button.w-100(
                  type="success"
                  size="small"
                  v-else-if="payload.status === 'PROCESSED'"
                  @click="handleOrder('deliver')"
                  ) Kirim Pesanan

                el-button.w-100(
                  size="small"
                  type="warning"
                  v-else-if="payload.status === 'DELIVERING'"
                  @click="handleOrder('finish')"
                  ) Pengiriman Selesai
                
                el-dialog(title="Masukan AWB" :visible.sync="state.isAwbDialog" width="380px" custom-class="dialog-body-pad-0")
                  el-form(:model="form" :rules="rules" ref="refForm")
                    el-form-item(prop="airway_bill")
                      el-input(v-model="form.airway_bill" placeholder="Masukan awb")
                    .mt-3.text-right
                      el-button(size="small" type="primary" @click="submitAwb()") Proses

</template>

<script>
import { handler } from '@/controllers/handler'
import { reactive, ref, watch } from '@nuxtjs/composition-api'

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

    const form = reactive({
      airway_bill: '',
    })

    const rules = reactive({
      airway_bill: [
        {
          required: true,
          message: 'Please input awb number',
          trigger: 'blur',
        },
      ],
    })

    const state = reactive({
      isAwbDialog: false,
      paramsTemporary: null,
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

    function handleOrder(status) {
      let msg, params
      switch (status) {
        case 'process':
          msg = 'Apakah anda yakin akan memproses pesanan ini?'
          processOrder(msg, params, status)
          break
        case 'deliver':
          msg = 'Apakah anda yakin akan mengirim pesanan ini?'
          params = {
            logistic_awb: null,
          }
          state.paramsTemporary = { msg, params, status }
          state.isAwbDialog = true
          break
        default:
          msg = 'Apakah anda yakin akan melakukan aksi ini?'
          processOrder(msg, params, status)
          break
      }
    }

    function processOrder(msg, params, status) {
      const _this = ctx.root
      _this
        .$confirm(msg, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
        .then(() => {
          postData(`/transaction/status/${status}/${props.payload.id}`, params)
        })
        .catch(() => {
          // console.log('cancel')
        })
    }

    const refForm = ref(null)
    function submitAwb() {
      refForm.value.validate((valid) => {
        if (valid) {
          processOrder(
            state.paramsTemporary.msg,
            form,
            state.paramsTemporary.status
          )
          state.isAwbDialog = false
        }
      })
    }

    return {
      response,
      handleOrder,
      submitAwb,
      refForm,
      rules,
      form,
      state,
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
