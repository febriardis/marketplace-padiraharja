<template lang="pug">
    .transaction-list
        h3 Daftar Transaksi
        .card-custom.pl-3.pr-3
            el-tabs(v-model="state.activeName" @tab-click="handleClick")
                el-tab-pane(v-for='item in state.orderStatus' :key='item.id' :label='item.name' :name='item.id')
                    .hide-on-mobile
                      .order-head
                          .row
                              .col-md-3
                                  | Produk
                              .col.text-center
                                  | Pemesan
                              .col.text-center
                                  | Dikirim ke
                              .col.text-center
                                  | Status
                              .col.text-center
                                  | Total (Nominal)
                              .col.text-center
                                  | Aksi

                      p.text-center(v-if="state.datas.length === 0")
                        | No Data
                      order-items(
                        v-else
                        v-for="order in state.datas"
                        :key="order.id"
                        :payload="order"
                        :fetchOrders="fetchOrders")

                    .show-on-mobile
                      //- .order-head
                          .row
                              .col-md-3
                                  | Produk phone
                              .col.text-center
                                  | Pemesan
                              .col.text-center
                                  | Dikirim ke
                              .col.text-center
                                  | Status
                              .col.text-center
                                  | Total (Nominal)
                              .col.text-center
                                  | Aksi

                      p.text-center(v-if="state.datas.length === 0")
                        | No Data
                      order-items-phone(
                        v-else
                        v-for="order in state.datas"
                        :key="order.id"
                        :payload="order"
                        :fetchOrders="fetchOrders")
                    
                    .card-custom.p-2.mt-1(v-if="state.pagination")
                      el-pagination(
                        background
                        layout="prev, pager, next"
                        :current-page.sync="filters.page"
                        :page-size="filters.limit"
                        :total="state.pagination.total_record")
        
</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'

export default {
  components: {
    OrderItems: () => import('@/components/store/utilities/List'),
    OrderItemsPhone: () => import('@/components/store/utilities/ListOnPhone'),
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
        { id: 'REQUESTED', name: 'Konfirmasi Pesanan' },
        { id: 'DELIVERING', name: 'Pesanan Diantar' },
        { id: 'FINISHED', name: 'Pesanan Selesai' },
        { id: 'REJECTED', name: 'Pesanan Dibatalkan' },
      ],
      datas: [],
      pagination: null,
    })

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
            total_record: parseInt(data.paging.page),
            total_page: parseInt(data.paging.total_page),
          }
        }
      },
      { deep: true }
    )

    function fetchOrders() {
      fetchData('/transaction', filters)
    }

    function handleClick(tab) {
      state.datas = []
      state.pagination = null
      filters.status = tab.name
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      filters,
      state,
      result,
      fetchOrders,
      handleClick,
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
