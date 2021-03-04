<template lang="pug">
    .products-listing
        .listing-title
          h2.m-0 Produk Pasar Tradisional
        .row.mt-3
          .col-lg-2.col-md-3.col-sm-6.col-6(v-for="(item, key) in products" :key="key")
            ProductInfo.w-100(:product="item")
</template>

<script>
export default {
  components: {
    ProductInfo: () => import('@/components/base/ProductInfo'),
  },
  data: () => ({
    products: [],
  }),
  computed: {
    categoryId() {
      return this.$route.query.category_id
    },
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      let url
      if (this.categoryId) {
        url = `/product/category/${this.categoryId}`
      } else {
        url = '/product/product/all'
      }
      const response = await this.$api.fetchData(url)
      if (response.status === 200) {
        this.products = response.data.data
      } else {
        this.products = []
      }
    },
  },
}
</script>

<style lang="scss">
.listing-title {
  border-bottom: 1px solid #d3d3d3;
  background: #ffffff;
  position: sticky;
  border-radius: 10px;
  padding: 10px;
  z-index: 99;
}

@media (min-width: 769px) {
  .listing-title {
    top: 110px;
  }
}
@media (max-width: 769px) {
  .listing-title {
    top: 98px;
  }
}
</style>
