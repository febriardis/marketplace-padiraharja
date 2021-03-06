<template lang="pug">
  .homepage
    BannerCarousel

    //- produk tradisional
    section.products-list
      .d-flex.justify-content-between.align-items-center
        h2 Produk Pasar Tradisional
        a.red-link(href="javascript:void(0)" @click="$router.push({ name: 'product-listing', query: {category_id: 3} })") Lihat Semua
      ProductCarousel(:category-id="3")

    //- produk terbaru 
    section.products-list.mt-4
      .d-flex.justify-content-between.align-items-center
        h2 Produk Terbaru
        a.red-link(href="javascript:void(0)" @click="$router.push({ name: 'product-listing' })") Lihat Semua
      ProductCarousel
    
    section.category-list.mt-4
      CategoryCarousel(v-model="current_category")

    section.products-list.mt-4
      .row
        .col-lg-2.col-md-3.col-sm-6.col-6(v-for="(item, index) in products_by_category" :key="index")
          ProductInfo.w-100(:product="item")
    
    //- bottom navigation
    BottomNavigation
</template>

<script>
export default {
  components: {
    BannerCarousel: () => import('@/components/homepage/BannerCarousel'),
    ProductCarousel: () => import('@/components/base/ProductCarousel'),
    CategoryCarousel: () => import('@/components/base/CategoryCarousel'),
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
    ProductInfo: () => import('@/components/base/ProductInfo'),
  },
  data: () => ({
    filters: {
      page: 0,
      limit: 10,
    },
    current_category: null,
    products_by_category: [],
  }),
  watch: {
    current_category(value) {
      if (value) {
        this.fetchProductByCategory(value)
      }
    },
  },
  methods: {
    async fetchProductByCategory(id) {
      const response = await this.$api.fetchData(
        `/product/category/${id}`,
        this.filters
      )
      if (response.status === 200) {
        this.products_by_category = response.data.data
      }
    },
  },
}
</script>

<style lang="scss">
.category-list {
  border-bottom: 1px solid #d3d3d3;
  background: #ffffff;
  position: sticky;
  border-radius: 10px;
  z-index: 99;
}
@media (min-width: 769px) {
  .category-list {
    top: 110px;
  }
}
@media (max-width: 769px) {
  .category-list {
    top: 98px;
  }
}
</style>
