<template lang="pug">
    .cart.mt-4
        h2 Berita Harian Majalengka
        ListingSkeleton(v-if="isLoading")
        p.m-0.text-center(v-else-if="news.length === 0") Tidak ada berita
        el-card.mb-2.card-link(class="box-card" v-for="(item, key) in news" :key="key" v-else)
            a.card-news(href="javascript:void(0)" @click="$router.push({name: 'news-slug', params: {slug: item.id}})")
                .row
                    .col-md-1.col-3
                        .product-img
                            img(:src="item.image" width="80" height="80")
                    .col
                        p.m-0.font-weight-light {{item.created_at | formatDate('DD MMMM YYYY HH:mm')}}
                        p.m-0.font-weight-bold {{item.title}}
                
        //- bottom navigation
        BottomNavigation
</template>

<script>
export default {
  components: {
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
  },

  data: () => ({
    news: [],
    isLoading: false,
  }),

  mounted() {
    this.fetchUserCart()
  },

  methods: {
    async fetchUserCart() {
      this.isLoading = true
      const response = await this.$api.fetchData('/public/news')
      if (response.status === 200) {
        this.news = response.data.data
      }
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss">
.card-news {
  display: block;
  &:hover {
    color: #000000;
  }
}
</style>
