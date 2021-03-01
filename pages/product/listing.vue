<template lang="pug">
    .products-listing
        .listing-title
            h2.m-0 Produk Pasar Tradisional
        .row.mt-3
            .col-md-2.col-sm-6.col-6(v-for="item in 20" :key="item")
                ProductInfo.w-100
</template>

<script>
export default {
  components: {
    ProductInfo: () => import('@/components/base/ProductInfo'),
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
  top: 110px;
}
</style>
