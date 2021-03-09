<template lang="pug">
    .product-list
        .row.align-items-center
            .col
              h3.mb-0 Riwayat Penarikan
            .col.text-right
                el-button(size="small" @click="state.isDialog = true" plain icon="el-icon-plus")
                  | Tarik Saldo
        .order-head
            .row
                .col.text-center
                    | Bank
                .col.text-center
                    | Nominal
                .col.text-center
                    | Status
                .col.text-center
                    | Dibuat pada

        p.text-center(v-if="state.withdraw.length === 0")
            | No Data
        .order-content.text-size-small(v-for="(item, key) in state.withdraw" :key="key" v-else)
            .row.align-items-center
                .col.text-center.border-right
                    p.text-color-gray.m-0 {{ item.user_bank.bank_name }}
                .col.text-center.border-right
                    p.text-color-gray.m-0 Rp. {{ item.amount | price }}
                .col.text-center.border-right
                    p.text-color-gray.m-0(:class="item.status === 'APPROVED' ? 'text-success' : item.status === 'PENDING' ? 'text-warning' : 'text-danger'")
                        |  {{ item.status }}
                .col.text-center
                    p.text-color-gray.m-0 {{ item.created_at | formatDate('DD-MM-YYYY') }}
        

        
        .card-custom.p-2.mt-1(v-if="state.pagination")
          el-pagination(
            background
            layout="prev, pager, next"
            :current-page.sync="filters.page"
            :page-size="filters.limit"
            :total="state.pagination.total_record")

        //- form create withdraw
        FormWithdraw(
          v-model="state.isDialog"
          @change="fetchWithdraw")
            
        //- LoadingScreen(v-if="deleted && deleted.isLoading")
</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'

export default {
  setup() {
    const { result, fetchData } = handler()

    const state = reactive({
      isDialog: false,
      withdraw: [],
      pagination: null,
    })

    const filters = reactive({
      limit: 10,
      page: 0,
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          const data = value.response
          state.withdraw = data.data
          state.pagination = {
            total_record: parseInt(data.paging.page),
            total_page: parseInt(data.paging.total_page),
          }
        }
      },
      { deep: true }
    )

    function fetchWithdraw() {
      fetchData('/withdraw', filters)
    }

    onMounted(() => {
      fetchWithdraw()
    })

    return {
      state,
      filters,
      fetchWithdraw,
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
