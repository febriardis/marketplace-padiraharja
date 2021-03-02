<template lang="pug">
    .products-carousel
        carousel(
            navigationNextLabel="<i class='el-icon-arrow-right'></i>",
            navigationPrevLabel="<i class='el-icon-arrow-left'></i>",
            :navigationEnabled='true',
            :per-page-custom='[[320, 6], [641, 6], [1024, 6]]',
            :space-padding='4',
            :pagination-enabled='false')
            slide(v-for="(item, index) in 20", :key="index")
              ProductInfo
</template>

<script>
export default {
  components: {
    ProductInfo: () => import('@/components/base/ProductInfo'),
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
