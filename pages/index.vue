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
      MugenScroll(v-if="products_by_category.length !== 0", :handler="fetchProductByCategory", v-loading="loadFirst", :should-handle="!isBusy", :handle-on-mount="false")
        .row
          .col-lg-2.col-md-3.col-sm-6.col-6(v-for="(item, index) in products_by_category" :key="index")
            ProductInfo.w-100(:product="item")
        
        .d-flex.justify-content-center.mb-4(v-if="isLoadMoreLoading")
            el-button(type="primary", :loading="true")
                | Loading...

        .d-flex.justify-content-center.mb-4(v-if="isNewest")
            el-button(type="primary", plain, size="small", :disabled="true")
                | Newest Product
    //- bottom navigation
    BottomNavigation
</template>

<script>
export default {
  components: {
    ProductInfo: () => import('@/components/base/ProductInfo'),
    BannerCarousel: () => import('@/components/homepage/BannerCarousel'),
    ProductCarousel: () => import('@/components/homepage/ProductCarousel'),
    CategoryCarousel: () => import('@/components/homepage/CategoryCarousel'),
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
  },
  data: () => ({
    filters: {
      page: 0,
      limit: 10,
    },
    current_category: null,
    products_by_category: [],

    // Loading State
    isNewest: false,
    isFirstLoad: false,
    isBusy: false,
    isLoadMoreLoading: false,
    isLoading: false,
    isLoadMore: false,
    loadFirst: false,
  }),
  watch: {
    current_category(value) {
      if (value) {
        this.fetchProductByCategory()
      }
    },
  },
  methods: {
    async fetchProductByCategory() {
      if (this.isFirstLoad) {
        this.loadFirst = true
      } else {
        this.filters.page = this.filters.page + 1
      }
      this.isBusy = true
      this.isLoading = true
      this.isLoadMoreLoading = true
      this.isFirstLoad = false

      const response = await this.$api.fetchData(
        `/product/category/${this.current_category}`,
        this.filters
      )
      if (response.status === 200 && response.data.data.length > 0) {
        setTimeout(() => {
          const data = response.data.data
          this.products_by_category = this.products_by_category.concat(data)
          this.isBusy = false
          this.isLoadMoreLoading = false
        }, 1000)
      } else {
        this.isBusy = true
        this.isLoadMoreLoading = false
        if (this.isFirstLoad) {
          this.products_by_category = []
        } else {
          this.isNewest = true
        }
      }
      this.isLoading = false
      this.loadFirst = false
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
