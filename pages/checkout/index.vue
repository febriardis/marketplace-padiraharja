<template lang="pug">
  .containers
    .row
      .col-md-8
        h3.mb-2
          | Checkout
        
        .address-detail
          .border-bottom
            h4.mb-3.text-color-gray Alamat Pengiriman
          .border-bottom.text-size-small.text-color-gray(v-if="form.addressSelected")
            p.mt-2 {{form.addressSelected.address}}, {{form.addressSelected.district_id.subdistrict_name}}, {{form.addressSelected.city_id.type}} {{form.addressSelected.city_id.city_name}}. {{form.addressSelected.province_id.province}}, Kode Pos {{form.addressSelected.city_id.postal_code}}
          p.text-color-gray.text-size-mini.text-center(v-else)
            | Tidak ada alamat pengiriman.
          .border-bottom
            el-button.mt-2.mb-2(plain @click="state.isAddDialog = true" icon="el-icon-plus") 
              | {{form.addressSelected ? 'Edit' : 'Tambah'}} Alamat

            //- add address dialog
            AddDialog(
              v-model="state.isAddDialog" 
              :addressData="form.addressSelected"
              @change="form.addressSelected = $event")
        
        .order-detail(v-if="state.productOrder")
          h4.mb-3.text-color-gray Detail Pesanan 
          .order-header
            p.mb-2 {{state.productOrder.merchant.name}}
            p.m-0.text-size-small.text-color-gray {{state.productOrder.merchant.city ? state.productOrder.merchant.city.name : null}}
          .order-body.mt-3
            .row
              .col-md-5
                .d-flex
                  .product-image.mr-3
                      img(:src="state.productOrder.photo" width="70" height="70")
                  .product-detail.w-100
                    p.font-weight-bold.m-0 {{state.productOrder.name}}
                    .mt-2.pb-2.d-flex.justify-content-between
                      p.m-0.text-price.font-weight-bold Rp. {{state.productOrder.price | price}}
                      p.m-0 {{form.quantity}} Pcs
              
              .col.text-color-gray.text-right
                SelectCourierField(
                  v-model="form.courierSelected"
                  @change="form.originCourierType = $event"
                  :address-data="form.addressSelected"
                  :quantity="parseInt(form.quantity)"
                  :origin-address="state.originAddress"
                  :weight="parseInt(state.productOrder.weight)"
                  :disabled="!form.addressSelected")
                p.text-color-gray.font-weight-light.text-danger(v-if="!form.addressSelected") 
                  | Silahkan masukan alamat pengiriman!
                .delivery-detail.text-size-mini(v-else-if="form.courierSelected")
                  p.mb-2 Est. Pengiriman: {{form.courierSelected[1].cost[0].etd}} Hari
                  p.mt-0.mb-2.font-weight Est. Ongkir: Rp. {{form.courierSelected[1].cost[0].value | price}}
      .col-md-4
        .order-info
          OrderInfo(
            @change="state.totalOrder = $event"
            :quantity="form.quantity"
            :delivery-fee="form.courierSelected ? form.courierSelected[1].cost[0].value : 0"
            :product-price="state.productOrder ? state.productOrder.price : 0")
            el-button.w-100.mb-2(type='primary' v-loading.fullscreen.lock="response.isLoading" @click="submitForm()") BUAT PESANAN

        //- payment dialog
        PaymentDialog(
          v-model="state.isPayDialog"
          :totalOrder="state.totalOrder"
          @change="params.payment_method_id = $event.id, postCheckout($event)")
        
        //- transaction dialog
        TransactionDetail(
          v-if="state.isTransactionDialog"
          v-model="state.isTransactionDialog"
          :payment-data="state.paymentData"
          :transaction-data="state.transactionData")

    LoadingScreen(v-if="state.isLoadingContent")
</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'

export default {
  middleware: 'authenticated',
  components: {
    AddDialog: () => import('@/components/address/AddDialog'),
    OrderInfo: () => import('@/components/checkout/OrderInfo'),
    PaymentDialog: () => import('@/components/checkout/PaymentDialog'),
    TransactionDetail: () => import('@/components/checkout/TransactionDetail'),
  },
  setup(_, { root }) {
    const { form: response, postData, result, fetchData } = handler()

    const state = reactive({
      totalOrder: 0,
      isAddDialog: false,
      isPayDialog: false,
      productOrder: null,
      originAddress: null,
      isLoadingContent: false,
      isTransactionDialog: false,
      transactionData: null,
      paymentData: null,
    })

    const form = reactive({
      quantity: null,
      addressSelected: null,
      courierSelected: null,
      originCourierType: null,
    })

    const params = reactive({
      payment_method_id: null,
      is_balance: false,
      amount: 0,
      detail: [],
      logistic: null,
      origin_details: null,
      destination_details: null,
    })

    function submitForm() {
      if (!form.addressSelected) {
        root.$message({
          type: 'warning',
          message: 'Silahkan masukan atau pilih alamat pengiriman',
        })
      } else if (!form.courierSelected) {
        root.$message({
          type: 'warning',
          message: 'Silahkan pilih kurir',
        })
      } else {
        state.isPayDialog = true
      }
    }

    function postCheckout(paymentData) {
      state.paymentData = paymentData
      params.amount = state.totalOrder
      params.detail = [
        {
          product_id: state.productOrder.id,
          quantity: form.quantity,
        },
      ]
      params.logistic = {
        courier_id: form.originCourierType.courier_id,
        courier_service: form.courierSelected[1].service,
        etd: form.courierSelected[1].cost[0].etd,
        postal_fee: parseInt(form.courierSelected[1].cost[0].value),
      }
      params.origin_details = {
        type: state.originAddress.city.type,
        address: state.originAddress.address,
        province_id: state.originAddress.province.province_id,
        province: state.originAddress.province.province,
        city_id: state.originAddress.city.city_id,
        city: state.originAddress.city.city_name,
        subdistrict_id: state.originAddress.subdistrict.subdistrict_id,
        subdistrict_name: state.originAddress.subdistrict.subdistrict_name,
      }
      params.destination_details = {
        type: form.originCourierType.originType,
        address: form.addressSelected.address,
        province_id: form.addressSelected.province_id.province_id,
        province: form.addressSelected.province_id.province,
        city_id: form.addressSelected.city_id.city_id,
        city: form.addressSelected.city_id.city_name,
        subdistrict_id: form.addressSelected.district_id.subdistrict_id,
        subdistrict_name: form.addressSelected.district_id.subdistrict_name,
      }
      postData('/transaction', params)
    }

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          state.transactionData = value.response.data
          state.isTransactionDialog = true
          deleteFormCart()
        }
      },
      { deep: true }
    )

    const deleteFormCart = async () => {
      const response = await root.$api.deleteData(
        `/cart/${state.productOrder.id}`
      )
      if (response.status === 200) {
        fetchUserCart()
      }
    }

    const fetchUserCart = async () => {
      const response = await root.$api.fetchData('/cart')
      if (response.status === 200) {
        const data = response.data.data
        const count = data.length > 0 ? data.length : null
        root.$store.commit('user/SET_CART_COUNT', count)
      }
    }

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.productOrder = value.response.data
          fetchOriginAddress()
        }
        state.isLoadingContent = false
      },
      { deep: true }
    )

    function fetchDetail() {
      state.isLoadingContent = true
      const query = root.$route.query
      form.quantity = query.quantity
      fetchData(`/product/${query.product_id}`)
    }

    const fetchOriginAddress = async () => {
      const response = await root.$api.fetchData(
        `/raja-ongkir/origin-address/${state.productOrder.merchant.id}`
      )
      if (response.status === 200) {
        state.originAddress = response.data.data
      }
    }

    onMounted(() => {
      fetchDetail()
    })

    return {
      state,
      form,
      params,
      submitForm,
      response,
      postCheckout,
    }
  },

  head: () => ({
    title: 'Checkout - Padiraharja',
  }),
}
</script>

<style lang="scss">
.order-info {
  display: block;
  position: relative;
  margin: 16px 0;
  padding: 1px 12px;
  border-radius: 8px;
  box-shadow: rgb(202, 211, 225) 0px 1px 4px 0px;
  background-color: rgb(255, 255, 255);
}
</style>
