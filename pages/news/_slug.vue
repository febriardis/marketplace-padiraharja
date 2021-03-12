<template lang="pug">
    .news-detail.mt-3(v-if="news")
      .hide-on-mobile
        .news-title
          h2.mb-0 {{news.title}}
          p.text-size-mini.font-weight-light.mt-1.mb-2 {{news.created_at | formatDate('dddd, DD-MM-YYYY HH:mm')}}
        .news-image.text-center
          img.w-100.img-detail(:src="news.image")
        .news-detail
            .news-content(v-html="news.content")
      
      .show-on-mobile
        .row
            .col-md-5.col-sm-5
                img.w-100.img-detail(:src="news.image")
            .col
                h2.mb-0 {{news.title}}
                .news-detail
                    p.text-size-mini.font-weight-light.mt-1.mb-2 Dibuat Pada: {{news.created_at | formatDate('DD-MM-YYYY HH:mm')}}
                    .news-content(v-html="news.content")

</template>

<script>
export default {
  data: () => ({
    news: null,
  }),
  computed: {
    newsId() {
      return this.$route.params.slug
    },
  },
  mounted() {
    this.fetchNewsDetail()
  },
  methods: {
    async fetchNewsDetail() {
      const response = await this.$api.fetchData(`/public/news/${this.newsId}`)
      if (response.status === 200) {
        this.news = response.data.data
      }
    },
  },
}
</script>

<style lang="scss">
@media (min-width: 769px) {
  .img-detail {
    max-width: 80%;
    height: 400px;
  }
}

@media (max-width: 769px) {
  .img-detail {
    height: 300px;
  }
}
</style>
