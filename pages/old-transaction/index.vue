<template lang="pug">
    .containers
        h3 Daftar Transaksi
        .card-custom.pl-3.pr-3
            el-tabs(v-model="state.activeName" @tab-click="handleClick")
                el-tab-pane(v-for='item in state.orderStatus' :key='item.id' :label='item.name' :name='item.id')
                    .order-on-desktop
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

                    .order-on-phone
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
                        :current-page.sync="filter.offset"
                        :page-size="filter.limit"
                        :total="state.pagination.total_record")
        
        LoadingScreen(v-if="result.isLoading")
</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'

export default {
  middleware: 'authenticated',
  components: {
    OrderItems: () => import('@/components/old-transaction/OldList'),
    OrderItemsPhone: () =>
      import('@/components/old-transaction/OldListOnPhone'),
  },
  setup() {
    const { result, fetchData } = handler()

    const filter = reactive({
      order_status: null,
      offset: 1,
      limit: 10,
    })

    const state = reactive({
      activeName: 0,
      orderStatus: [
        { id: '0', name: 'Semua Pesanan' },
        { id: '1', name: 'Menunggu Pembayaran' },
        { id: '3', name: 'Sedang Diproses' },
        { id: '4', name: 'Sedang Dikirim' },
        { id: '5', name: 'Selesai' },
      ],
      datas: [],
      pagination: null,
    })

    watch(
      () => filter,
      () => {
        fetchOrders()
      },
      { deep: true }
    )
    watch(
      () => result.response,
      (value) => {
        if (value.data && Object.keys(value.data).length !== 0) {
          state.datas = value.data.rows
          state.pagination = {
            total_record: value.data.count,
            total_page: value.data.total_page,
          }
        }
      },
      { deep: true }
    )

    function fetchOrders() {
      fetchData('/orders', filter)
    }

    function handleClick(tab) {
      state.datas = []
      state.pagination = null
      filter.order_status = tab.label !== 'Semua Pesanan' ? tab.label : ''
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      filter,
      state,
      result,
      fetchOrders,
      handleClick,
    }
  },

  head: () => ({
    title: 'Transaction - Padiraharja',
  }),
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

.order-on-desktop {
  @media (max-width: 395px) {
    display: none;
  }
}
.order-on-phone {
  display: none !important;
  @media (max-width: 395px) {
    display: block !important;
  }
}
</style>
