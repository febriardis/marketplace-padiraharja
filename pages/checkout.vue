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
            p.font-weight-bold.mb-1 {{form.addressSelected.fullname}}
            p.mt-2.mb-1 {{form.addressSelected.title}}
            p.mt-2.mb-1 {{form.addressSelected.phone}}
            p.mt-2 {{form.addressSelected.address}}, {{form.addressSelected.subdistrict_name}}, {{form.addressSelected.city_name}}, {{form.addressSelected.village}}, {{form.addressSelected.postal_code}}
          p.text-color-gray.text-size-mini.text-center(v-else)
            | Tidak ada alamat yang dipilih.
          .border-bottom
            el-button.mt-2.mb-2(plain @click="state.isAddDialog = true" icon="el-icon-plus") Tambah Alamat
            el-button.mt-2.mb-2(plain @click="state.isListDialog = true" :disabled="state.addressList.length === 0") Pilih Alamat Lain

            add-dialog(v-model="state.isAddDialog" 
              :newAddress.sync="state.newAddress")
            list-dialog(v-model="state.isListDialog" 
              :address-list="state.addressList"
              :address-selected.sync="form.addressSelected")
        .notes.mt-2
          label.text-size-mini Catatan:
          el-input.mt-2(type="textarea" v-model="params.note" placeholder="Masukan catatan (optional)")

      .col-md-4
        .order-info
          OrderInfo(
            :attrDetail="attrDetail" 
            :quantity="state.quantity" 
            v-model="form.courierSelected"
            :subdistrictId="form.addressSelected ? form.addressSelected.subdistrictId : null")
            el-button.w-100.mb-2(type='primary' v-loading.fullscreen.lock="response.isLoading" @click="submitForm()") BUAT PESANAN

    f-loading-screen(v-if="state.isLoadingContent || paid.isLoading")
</template>

<script>
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
import { utilities } from '~/controllers/utilities'

export default {
  name: 'Checkout',
  // layout: 'auth',
  middleware: 'authenticated',
  components: {
    OrderInfo: () => import('@/components/checkout/OrderInfo'),
    AddDialog: () => import('@/components/address/AddDialog'),
    ListDialog: () => import('@/components/address/ListDialog'),
  },
  setup(_, ctx) {
    const { form: response, postData, result, fetchData } = handler()
    const {
      styleDetail,
      fetchStylesById,
      fabrics,
      fetchFabricsById,
      stitches,
      fetchStitchesById,
      cuttings,
      fetchCuttingsById,
      sizes,
      fetchSizesById,
      paid,
      postPaid,
    } = utilities()

    const state = reactive({
      isAddDialog: false,
      isListDialog: false,
      addressList: [],
      addressSelected: null,
      newAddress: false,
      quantity: null,
      courierSelected: null,
      isLoadingContent: false,
    })

    const form = reactive({
      addressSelected: null,
      courierSelected: null,
    })

    const attrDetail = reactive({
      styleDetail: null,
      fabrics: null,
      stitches: null,
      cuttings: null,
      sizes: null,
    })

    const params = reactive({
      order_id: `ONORD${ctx.root.$filters.formatDate(
        new Date(),
        'YYYYMMDDHHmmss'
      )}`,
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

    watch(
      () => paid,
      (value) => {
        if (value.isSuccess) {
          window.open(value.response.Data.Url, '_self')
        }
      },
      { deep: true }
    )

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          postPaid({
            order_id: value.response.data.id,
          })
        }
      },
      { deep: true }
    )

    function submitForm() {
      const _this = ctx.root
      if (!form.addressSelected) {
        _this.$message({
          type: 'warning',
          message: 'Silahkan masukan atau pilih alamat pengiriman',
        })
      } else if (!form.courierSelected) {
        _this.$message({
          type: 'warning',
          message: 'Silahkan pilih kurir',
        })
      } else {
        const query = _this.$route.query
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
    }

    watch(
      () => state.newAddress,
      (value) => {
        if (value) {
          fetchAddresses()
        }
      }
    )

    watch(
      () => result.response,
      (value) => {
        if (value && value.data && Object.keys(value.data).length !== 0) {
          state.addressList = value.data
          if (state.addressList.length > 0) {
            form.addressSelected = state.addressList[0]
          }
        }
      },
      { deep: true }
    )

    function fetchAddresses() {
      fetchData('/addresses')
    }

    watch(
      () => styleDetail,
      (value) => {
        if (value.isSuccess) {
          attrDetail.styleDetail = value.response.data
        }
      },
      { deep: true }
    )
    watch(
      () => stitches,
      (value) => {
        if (value.isSuccess) {
          attrDetail.stitches = value.response.data
        }
      },
      { deep: true }
    )
    watch(
      () => fabrics,
      (value) => {
        if (value.isSuccess) {
          attrDetail.fabrics = value.response.data
        }
      },
      { deep: true }
    )
    watch(
      () => cuttings,
      (value) => {
        if (value.isSuccess) {
          attrDetail.cuttings = value.response.data
        }
      },
      { deep: true }
    )
    watch(
      () => sizes,
      (value) => {
        if (value.isSuccess) {
          attrDetail.sizes = value.response.data
          state.isLoadingContent = false
        }
      },
      { deep: true }
    )

    function fetchAttrDetail() {
      const query = ctx.root.$route.query
      state.quantity = query.quantity
      fetchStylesById(query.style_id)
      fetchStitchesById(query.stitch_id)
      fetchFabricsById(query.fabric_id)
      fetchCuttingsById(query.cutting_id)
      fetchSizesById(query.size_id)
      state.isLoadingContent = true
    }

    onMounted(() => {
      fetchAddresses()
      fetchAttrDetail()
    })

    return {
      state,
      form,
      params,
      submitForm,
      attrDetail,
      response,
      paid,
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
