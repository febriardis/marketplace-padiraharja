<template lang="pug">
    .product-list
        .row.align-items-center
            .col
              h3.mb-0 Akun Bank
              p.mt-2.mb-0.text-color-gray Atur akun bank anda.
            .col.text-right
                el-button(size="small" @click="state.bankData = null, state.isDialog = true" plain icon="el-icon-plus")
                    | Tambah Bank
        .order-head
            .row
                .col.text-center
                    | Nama Bank
                .col.text-center
                    | Nomor Rekening
                .col.text-center
                    | Nama Pemilik Rekening
                .col.text-center
                    | Aksi

        p.text-center(v-if="state.banks.length === 0")
            | No Data
        
        .order-content.text-size-small(v-for="(item, key) in state.banks" :key="key" v-else)
            .row.align-items-center
                .col.text-center.border-right
                    p.text-color-gray.m-0 {{ item.bank_name }}
                .col.text-center.border-right
                    p.text-color-gray.m-0 {{ item.account_number }}
                .col.text-center.border-right
                    p.text-color-gray.m-0 {{ item.account_name }}
                .col.text-center
                    .d-flex.justify-content-center
                        el-button(type="primary" @click="state.bankData = item, state.isDialog = true" size="mini" plain icon="el-icon-edit")
                        el-button(type="danger" @click="deleteProduct(item.id)" size="mini" icon="el-icon-delete")
        
        FormBank(
            v-model="state.isDialog"
            :bank-data="state.bankData"
            @change="fetchBanks" 
            v-if="state.isDialog")
            
        LoadingScreen(v-if="deleted && deleted.isLoading")
</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'

export default {
  setup(_, { root }) {
    const { result, fetchData, form: deleted, deleteData } = handler()

    const state = reactive({
      banks: [],
      isDialog: false,
      bankData: null,
    })
    const filters = reactive({
      limit: 10,
      page: 0,
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.banks = value.response.data
        }
      },
      { deep: true }
    )

    watch(
      () => deleted,
      (value) => {
        if (value.isSuccess) {
          fetchBanks()
        }
      },
      { deep: true }
    )

    function deleteProduct(id) {
      const _this = root
      _this
        .$confirm(
          'Apakah anda yakin akan menghapus akun bank ini?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        )
        .then(() => {
          deleteData(`/user_bank/${id}`)
        })
        .catch(() => {
          // console.log('cancel')
        })
    }

    function fetchBanks() {
      fetchData('/user_bank', filters)
    }

    onMounted(() => {
      fetchBanks()
    })

    return {
      state,
      deleted,
      filters,
      deleteProduct,
      fetchBanks,
    }
  },
}
</script>

<style lang="scss">
.order-head {
  background: #f6f6f6;
  color: #747474;
  padding: 10px;
  margin-top: 15px;
  border-radius: 4px;
}
.order-content {
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
