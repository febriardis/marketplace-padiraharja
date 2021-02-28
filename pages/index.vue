<template lang="pug">
  .homepage.mt-4
    BannerCarousel

    //- produk tradisional
    section.products-list
      .d-flex.justify-content-between.align-items-center
        h2 Produk Pasar Tradisional
        a.red-link(href="#") Lihat Semua
      ProductCarousel

    //- produk terbaru 
    section.products-list.mt-4
      .d-flex.justify-content-between.align-items-center
        h2 Produk Terbaru
        a.red-link(href="#") Lihat Semua
      ProductCarousel

    section.products-list.mt-4
      .row
        .col-md-2(v-for="item in 20" :key="item")
          ProductInfo.w-100
</template>

<script>
export default {
  components: {
    BannerCarousel: () => import('@/components/homepage/BannerCarousel'),
    ProductCarousel: () => import('@/components/base/ProductCarousel'),
    ProductInfo: () => import('@/components/base/ProductInfo'),
  },
}
</script>
