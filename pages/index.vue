<template lang="pug">
  .homepage.mt-4
    BannerCarousel

    //- produk tradisional
    section.products-list
      .d-flex.justify-content-between.align-items-center
        h2 Produk Pasar Tradisional
        a.red-link(href="javascript:void(0)" @click="$router.push({ name: 'product-listing', query: {type: 1} })") Lihat Semua
      ProductCarousel

    //- produk terbaru 
    section.products-list.mt-4
      .d-flex.justify-content-between.align-items-center
        h2 Produk Terbaru
        a.red-link(href="javascript:void(0)" @click="$router.push({ name: 'product-listing', query: {type: 2} })") Lihat Semua
      ProductCarousel
    
    section.category-list.mt-4
      CategoryCarousel

    section.products-list.mt-4
      .row
        .col-md-2.col-sm-6.col-6(v-for="item in 20" :key="item")
          ProductInfo.w-100
    
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
}
</script>

<style lang="scss">
.category-list {
  border-bottom: 1px solid #d3d3d3;
  background: #ffffff;
  position: sticky;
  border-radius: 10px;
  z-index: 99;
  top: 110px;
}
</style>
