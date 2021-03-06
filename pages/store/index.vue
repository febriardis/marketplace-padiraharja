<template lang="pug">
    .homepage
      .row.mt-4.justify-content-center(v-if="!store_data")
        .col-md-6
          h4.mt-2.mb-2 Buat Toko
          p.mt-0.text-size-small.text-color-gray Isi detail tokomu, dan bangun bisnis kecilmu dengan padiraharja sekarang juga.
          Form
      .row.mt-4(v-else)
        .col-md-3
          .store-detail.border-top.border-bottom.border-right.pb-2.pt-2
            .d-flex.align-items-center
                .product-image.mr-3
                    img(:src="store_data.logo" width="40" height="40")
                .product-detail
                    p.font-weight-bold.m-0 {{store_data.name}}
          el-menu.el-menu-vertical-demo(default-active="1")
            el-menu-item(index="1" @click="onSidebarClicked")
              i.fas.fa-store(style="margin-right:10px")
              span(slot='title') Toko
            el-menu-item(index="2" @click="onSidebarClicked")
              i.fas.fa-list(style="margin-right:16px")
              span(slot='title') Produk
            el-menu-item(index="3" @click="onSidebarClicked")
              i.fas.fa-map-pin(style="margin-right:22px")
              span(slot='title') Alamat Pengiriman
            el-menu-item(index="4" @click="onSidebarClicked")
              i.fas.fa-history(style="margin-right:15px")
              span(slot='title') Riwayat Transaksi

        .col-md-9
          FormStore(:storeData="store_data" @change="fetchStore" v-if="sidebar_type === '1'")
          ProductsList(v-else-if="sidebar_type === '2'")
          FormAddress(v-else-if="sidebar_type === '3'")
          TransactionsList(v-else-if="sidebar_type === '4'")
          
</template>

<script>
export default {
  middleware: 'authenticated',
  components: {
    FormStore: () => import('@/components/store/FormStore'),
    ProductsList: () => import('@/components/store/ProductsList'),
    FormAddress: () => import('@/components/store/FormAddress'),
    TransactionsList: () => import('@/components/store/TransactionsList'),
  },
  data: () => ({
    sidebar_type: '1',
    store_data: null,
  }),
  watch: {
    sidebar_type(value) {
      if (value === '1') {
        this.fetchStore()
      }
    },
  },
  mounted() {
    this.fetchStore()
  },
  methods: {
    onSidebarClicked(key) {
      this.sidebar_type = key.index
    },
    async fetchStore() {
      const response = await this.$api.fetchData('/user/merchant')
      if (response.status === 200) {
        this.store_data = response.data.data
      }
    },
  },
  head: () => ({
    title: 'Store Setting - Padiraharja',
  }),
}
</script>

<style lang="scss">
.store-detail {
  padding-left: 20px;
}
</style>
