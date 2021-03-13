<template lang="pug">
  .banner-carousel
    .loading-state(v-if="isLoading")
      Skeleton.hide-on-mobile(height="480px")
      Skeleton.show-on-mobile(height="260px")
    el-carousel(v-else indicator-position="outside")
      el-carousel-item(v-for="(item, key) in banners" :key="key")
        img(
          :src="$filters.imageViewBanner(item.image)"
          alt="banner"
          class="banner-img"
        )
</template>

<script>
export default {
  data: () => ({
    banners: [],
    isLoading: false,
  }),
  mounted() {
    this.fetchBanners()
  },
  methods: {
    async fetchBanners() {
      this.isLoading = true
      const response = await this.$api.fetchData('/public/banner')
      if (response.status === 200) {
        this.banners = response.data.data
      }
      this.isLoading = false
    },
  },
}
</script>

<style>
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
}
@media (min-width: 769px) {
  .el-carousel__container {
    height: 480px;
  }
}
@media (max-width: 769px) {
  .el-carousel__container {
    height: 250px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
