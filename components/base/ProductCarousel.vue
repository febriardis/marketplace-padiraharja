<template lang="pug">
    .products-carousel
        carousel(
            navigationNextLabel="<i class='el-icon-arrow-right'></i>",
            navigationPrevLabel="<i class='el-icon-arrow-left'></i>",
            :navigationEnabled='true',
            :per-page-custom='[[320, 6], [641, 6], [1024, 6]]',
            :space-padding='4',
            :pagination-enabled='false')
            slide(v-for="(item, index) in products", :key="index")
              ProductInfo(v-if="index < 1" :product="item")
</template>

<script>
export default {
  components: {
    ProductInfo: () => import('@/components/base/ProductInfo'),
  },
  props: {
    categoryId: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    products: [],
  }),
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      let url
      if (this.categoryId) {
        url = `/product/category/${this.categoryId}`
      } else {
        url = '/product'
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
