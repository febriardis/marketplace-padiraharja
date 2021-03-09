<template lang="pug">
    .products-carousel
        ProductListingSkeleton(:count="6" v-if="isLoading")
        carousel(
            v-else
            navigationNextLabel="<i class='el-icon-arrow-right'></i>",
            navigationPrevLabel="<i class='el-icon-arrow-left'></i>",
            :navigationEnabled='true',
            :per-page-custom='[[320, 6], [641, 6], [1024, 6]]',
            :space-padding='4',
            :pagination-enabled='false')
            slide(v-for="(item, index) in products", :key="index")
              ProductInfo(v-if="index < 10" :product="item")
</template>

<script>
export default {
  components: {
    ProductInfo: () => import('@/components/base/ProductInfo'),
    ProductListingSkeleton: () =>
      import('@/components/skeleton/ProductListing'),
  },
  props: {
    categoryId: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    filters: {
      page: 0,
      limit: 10,
    },
    products: [],
    isLoading: false,
  }),
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true
      let url
      if (this.categoryId) {
        url = `/product/category/${this.categoryId}`
      } else {
        url = '/product/product/all'
      }
      const response = await this.$api.fetchData(url, this.filters)
      if (response.status === 200) {
        this.products = response.data.data
      } else {
        this.products = []
      }
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss">
@media (max-width: 641px) {
  .products-carousel {
    .VueCarousel {
      margin: 0 10px;
    }
    .VueCarousel-navigation {
      .VueCarousel-navigation-prev {
        padding: 0;
        margin-right: 0;
      }
      .VueCarousel-navigation-next {
        padding: 0;
        margin-left: 0;
      }
    }
  }
}
</style>
