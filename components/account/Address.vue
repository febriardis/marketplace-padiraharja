<template lang="pug">
    .address
        .d-flex.justify-content-between.align-items-center
            h4 Daftar Alamat
            .action
                el-button(type="primary" @click="state.addressData = null, state.isAddDialog = true" size="small" icon="el-icon-plus")
                    | Tambah Alamat
        .tableFixHead(style="max-height: calc(100vh - 200px);padding-right:10px")
          table.table-address.text-size-small.mt-3
              thead
                  tr
                      th.text-left.pb-3.bg-white(width="16%") Penerima
                      th.text-left.pb-3.bg-white(width="30%") Alamat Pengiriman
                      th.text-left.pb-3.bg-white(width="30%") Daerah Pengiriman
                      th.text-left.pb-3.bg-white 
              tbody
                  tr(v-if="state.addressList.length === 0")
                      td.text-center.text-size-mini.pt-3(colspan="4") No Data
                  tr.text-size-mini(v-for="item in state.addressList" :key="item.id" v-else)
                      td.pt-3 
                          p.m-0.font-weight-bold {{item.fullname}}
                          p.mt-2 {{item.phone}}
                      td.pt-3 
                          p.m-0.font-weight-bold {{item.title}}
                          p.mt-2 {{item.address}}
                      td.pt-3 
                          P {{item.city_name}}
                      td.pt-3.text-right
                          el-button(size="small" @click="state.addressData = item, state.isAddDialog = true" icon="el-icon-edit") Edit
                          el-button(size="small" @click="deleteAddress(item.id)" icon="el-icon-delete") Delete
        
        add-dialog(v-model="state.isAddDialog"
          :newAddress.sync="state.newAddress" 
          :addressData="state.addressData")
</template>

<script>
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
export default {
  components: {
    AddDialog: () => import('@/components/address/AddDialog'),
  },
  setup(_, ctx) {
    const { result, fetchData, form: response, deleteData } = handler()
    const state = reactive({
      isAddDialog: false,
      addressList: [],
      addressData: null,
      newAddress: false,
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.addressList = value.response.data
        }
      },
      { deep: true }
    )

    watch(
      () => state.newAddress,
      (value) => {
        if (value) {
          fetchAddresses()
        }
      }
    )

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          fetchAddresses()
        }
      },
      { deep: true }
    )

    function deleteAddress(addressId) {
      const _this = ctx.root
      _this
        .$confirm('Are you sure want to delete this data?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
        .then(() => {
          deleteData(`/addresses/${addressId}`)
        })
    }

    function fetchAddresses() {
      fetchData('/addresses')
    }

    onMounted(() => {
      fetchAddresses()
    })

    return {
      state,
      deleteAddress,
    }
  },
}
</script>

<style lang="scss">
.address {
  height: calc(100vh - 200px);
}
.table-address {
  width: 100%;
  border-collapse: collapse;
  thead {
    tr {
      border-bottom: solid 1px #e0e0e0;
    }
  }
}
</style>
