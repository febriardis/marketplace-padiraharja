<template lang="pug">
    .products-listing
        .listing-title
          h2.m-0 Produk Pasar Tradisional
        section.products-list.mt-3
          ProductList(:url="categoryId ? `/product/category/${categoryId}` : '/product/product/all'" )
        
</template>

<script>
export default {
  components: {
    ProductList: () => import('@/components/base/ProductList'),
  },
  computed: {
    categoryId() {
      return this.$route.query.category_id
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
