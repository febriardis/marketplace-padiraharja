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
      CategoryCarousel(v-model="currentCategory")

    section.products-list.mt-4
      ProductListing(:url="`/product/category/${this.currentCategory}`" :refresh.sync="refreshContent")
     
    //- bottom navigation
    BottomNavigation
</template>

<script>
export default {
  components: {
    ProductListing: () => import('@/components/base/ProductListing'),
    BannerCarousel: () => import('@/components/homepage/BannerCarousel'),
    ProductCarousel: () => import('@/components/homepage/ProductCarousel'),
    CategoryCarousel: () => import('@/components/homepage/CategoryCarousel'),
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
  },
  data: () => ({
    refreshContent: false,
    currentCategory: null,
  }),
  watch: {
    currentCategory(value) {
      if (value) {
        this.refreshContent = true
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
