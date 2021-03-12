<template lang="pug">
    .order-content.text-size-small
        .row.border-bottom
            .col
              p.mt-0.mb-2.font-weight-bold
                | {{payload.merchant.name}}
            .col
              .d-flex.justify-content-end
                p.mt-0.mb-2.text-color-gray.mr-3.pr-3.border-right
                  | Tanggal Pesan: {{ payload.created_at | formatDate('DD MMM YYYY HH:mm') }}
                p.mt-0.mb-2.text-capitalize.text-warning.font-weight-bold
                  | {{payload.status.replace(/_/g, " ") | lowercase}}

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
        
        .row.border-top.pt-2
          .col
            .d-flex
              .pr-2
                a.text-primary(href="javascript:void(0)" @click="state.isDialog = true")
                  | Lihat Detail
              .ml-3.border-left.pl-3(v-if="payload.status === 'WAITING_PAYMENT'")
                a.red-link(href="javascript:void(0)" @click="processOrder('Apakah anda yakin akan membatalkan transaksi ini?', null, 'cancel' )")
                  | Batalkan Pesanan
              .ml-3.border-left.pl-3(v-if="payload.status === 'WAITING_PAYMENT'")
                a.text-color-orange(href="javascript:void(0)" @click="state.isConfirmDialog = true")
                  | Konfirmasi Pembayaran
              .ml-3.border-left.pl-3(v-if="payload.status === 'DELIVERING'")
                a.red-link(href="javascript:void(0)" @click="processOrder('Apakah anda yakin akan menyelesaikan transaksi ini?', null, 'finish' )")
                  | Konfirmasi Pesanan Sampai
          .col-4
            .d-flex.align-items-center.justify-content-end
              p.m-0.text-size-small.text-color-navy.mr-3 Total Pesanan 
              h3.m-0.text-price Rp. {{payload.amount + payload.postal_fee + payload.unique_code | price}}
        
        //- transaction detail dialog
        TransactionDetailDialog(v-model="state.isDialog" :payload="payload")
        
        el-dialog(title="Konfirmasi Pembayaran" :visible.sync="state.isConfirmDialog" width="380px" custom-class="dialog-body-pad-0")
          el-form(:model="form" :rules="rules" ref="refForm")
            el-form-item(prop="image" label="Bukti Transfer")
              UploadImageField(v-model="form.image" height="300px")
        
            .mt-3.text-right
              el-button(size="small" type="primary" @click="confirmPayment()") Submit
</template>

<script>
import { handler } from '@/controllers/handler'
import { reactive, ref, watch } from '@nuxtjs/composition-api'

export default {
  components: {
    TransactionDetailDialog: () => import('./TransactionDetailDialog'),
  },
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
      isDialog: false,
      isConfirmDialog: false,
    })

    const form = reactive({
      image: '',
    })

    const rules = reactive({
      image: [
        {
          required: true,
          message: 'Please input confirmation image',
          trigger: 'blur',
        },
      ],
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

    function confirmPayment() {
      refForm.value.validate((valid) => {
        if (valid) {
          const fd = new FormData()
          fd.append('photo', form.image)
          processOrder(
            'Apakah anda yakin akan mengirim bukti transfer ini?',
            fd,
            'confirmation'
          )
          state.isConfirmDialog = false
        }
      })
    }

    return {
      form,
      rules,
      refForm,
      state,
      response,
      processOrder,
      confirmPayment,
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
