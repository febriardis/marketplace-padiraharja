<template lang="pug">
  .product-listing
    .d-flex.justify-content-center.mt-3(v-if="loadFirst")
      el-button(type="primary", :loading="true")
        | Loading...
    .scroller-product
      MugenScroll(v-if="products.length !== 0", :handler="fetchProducts", v-loading="loadFirst", :should-handle="!isBusy", :handle-on-mount="false")
        .row
          .col-lg-2.col-md-3.col-sm-6.col-6(v-for="(item, index) in products" :key="index")
            ProductInfo.w-100(:product="item")
        
        .d-flex.justify-content-center.mt-3(v-if="isLoadMoreLoading")
          el-button(type="primary", :loading="true")
            | Loading...

        .d-flex.justify-content-center.mt-3(v-if="isNewest")
          el-button(type="primary", plain, size="small", :disabled="true")
            | Newest Product
</template>

<script>
export default {
  components: {
    ProductInfo: () => import('@/components/base/ProductInfo'),
  },
  props: {
    refresh: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      required: true,
      default: '',
    },
    filters: {
      type: Object,
      default: () => ({
        page: 0,
        limit: 10,
      }),
    },
  },
  data: () => ({
    products: [],

    // Loading State
    isNewest: false,
    isFirstLoad: false,
    isBusy: false,
    isLoadMoreLoading: false,
    isLoadMore: false,
    loadFirst: false,
  }),
  watch: {
    refresh(value) {
      if (value) {
        this.filters.page = 0
        this.isFirstLoad = true
        this.isNewest = false
        this.products = []
        this.fetchProducts()
        this.$emit('update:refresh', false)
      }
    },
  },
  mounted() {
    if (this.url) {
      this.isFirstLoad = true
      this.fetchProducts()
    }
  },
  methods: {
    async fetchProducts() {
      if (this.isFirstLoad) {
        this.loadFirst = true
      } else {
        this.filters.page = this.filters.page + 1
      }
      this.isBusy = true
      this.isLoadMoreLoading = true

      const response = await this.$api.fetchData(this.url, this.filters)
      if (response.status === 200 && response.data.data.length > 0) {
        setTimeout(() => {
          const data = response.data.data
          this.products = this.products.concat(data)
          this.isBusy = false
          this.isFirstLoad = false
          this.isLoadMoreLoading = false
        }, 1000)
      } else {
        this.isBusy = true
        this.isLoadMoreLoading = false
        if (this.isFirstLoad) {
          this.products = []
        } else {
          this.isNewest = true
        }
      }
      this.loadFirst = false
    },
  },
}
</script>
