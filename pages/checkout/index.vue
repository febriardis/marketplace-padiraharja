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
            p.m-0.text-size-small.text-color-gray {{state.productOrder.merchant.city.name}}
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
                  :address-data="form.addressSelected"
                  :quantity="parseInt(form.quantity)"
                  :merchant-id="state.productOrder.merchant.id"
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
            :quantity="form.quantity"
            :delivery-fee="form.courierSelected ? form.courierSelected[1].cost[0].value : 0"
            :product-price="state.productOrder ? state.productOrder.price : 0")
            el-button.w-100.mb-2(type='primary' v-loading.fullscreen.lock="response.isLoading" @click="submitForm()") BUAT PESANAN

        //- payment dialog
        PaymentDialog(
          v-model="state.isPayDialog" 
          @change="params.payment_method_id = $event, postCheckout()")

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
  },
  setup(_, { root }) {
    const { form: response, postData, result, fetchData } = handler()

    const state = reactive({
      isAddDialog: false,
      isPayDialog: false,
      productOrder: null,
      isLoadingContent: false,
    })

    const form = reactive({
      quantity: null,
      addressSelected: null,
      courierSelected: null,
    })

    const params = reactive({
      payment_method_id: null,

      style_id: null,
      fabric_id: null,
      stitch_id: null,
      size_id: null,
      cutting_id: null,
      qty: null,
      address_id: null,
      location_id: 2, // static
      logistic_info: null,
      logistic_charge: 0,
      note: null,
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

    function postCheckout() {
      const query = root.$route.query
      params.style_id = parseInt(query.style_id)
      params.fabric_id = parseInt(query.fabric_id)
      params.stitch_id = parseInt(query.stitch_id)
      params.size_id = parseInt(query.size_id)
      params.cutting_id = parseInt(query.cutting_id)
      params.qty = parseInt(query.quantity)
      params.address_id = form.addressSelected.id
      params.logistic_info = form.courierSelected.courier
      params.logistic_charge = form.courierSelected.courier_cost
      postData('/orders', params)
    }

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.productOrder = value.response.data
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
