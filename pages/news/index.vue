<template lang="pug">
    .cart.mt-4
        h2 Berita Harian Majalengka
        el-card.mb-2(class="box-card" v-for="item in 2" :key="item")
            .row
                .col-md-8
                    .d-flex
                        .product-img
                            img(src="https://via.placeholder.com/150" width="80")
                        .info-detail.ml-3
                            p.m-0.font-weight-light 17 Desember 2020 19:34
                            p.m-0.font-weight-bold Judul Berita
                
        //- bottom navigation
        BottomNavigation
</template>

<script>
export default {
  components: {
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
  },
}
</script>
