<template lang="pug">
    .transaction-list
        h3 Daftar Transaksi
        .card-custom.pl-3.pr-3
            el-tabs(v-model="state.activeName")
                el-tab-pane(v-for='item in state.orderStatus' :key='item.id' :label='item.name' :name='item.id')
                    .order-list
                      p.text-center.mb-4(v-if="state.datas.length === 0")
                        | No Data
                      order-items(
                        v-else
                        v-for="order in state.datas"
                        :key="order.id"
                        :payload="order"
                        :fetchOrders="fetchOrders")
                    
                    .card-custom.p-2.mt-1(v-if="state.pagination")
                      CPagination(v-model="filters.page" :total-page="state.pagination.total_page")
                      
</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'

export default {
  components: {
    OrderItems: () => import('./utilities/TransactionsListBody'),
  },
  setup() {
    const { result, fetchData } = handler()

    const filters = reactive({
      status: 'WAITING_PAYMENT',
      page: 0,
      limit: 10,
    })

    const state = reactive({
      activeName: 'WAITING_PAYMENT',
      orderStatus: [
        { id: 'WAITING_PAYMENT', name: 'Menunggu Pembayaran' },
        { id: 'REQUESTED', name: 'Menunggu Konfirmasi' },
        { id: 'PROCESSED', name: 'Sedang Diproses' },
        { id: 'DELIVERING', name: 'Sedang Diantar' },
        { id: 'FINISHED', name: 'Selesai' },
        { id: 'REJECTED', name: 'Ditolak' },
      ],
      datas: [],
      pagination: null,
    })

    watch(
      () => state.activeName,
      (value) => {
        filters.status = value
      },
      { deep: true }
    )

    watch(
      () => filters,
      () => {
        fetchOrders()
      },
      { deep: true }
    )
    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          const data = value.response
          state.datas = data.data
          state.pagination = {
            page: parseInt(data.paging.page),
            total_page: parseInt(data.paging.total_page),
          }
        } else {
          state.datas = []
          state.pagination = null
        }
      },
      { deep: true }
    )

    function fetchOrders() {
      fetchData('/transaction', filters)
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      filters,
      state,
      result,
      fetchOrders,
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
</style>
