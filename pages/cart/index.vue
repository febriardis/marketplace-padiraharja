<template lang="pug">
    .cart.mt-4
        h2 Keranjang

        el-card.mb-2(class="box-card" v-for="item in 2" :key="item")
            h3.mt-0.mb-2 Produk
            .row
                .col-md-8
                    .d-flex
                        .product-img
                            img(src="https://via.placeholder.com/150" width="70")
                        .info-detail.ml-3
                            p.font-weight-bold.m-0 Masker Kucing Emas Terbaru
                            .mt-2.pb-2.d-flex.justify-content-between
                                p.m-0.text-price.font-weight-bold Rp. 120.000
                                p.m-0 1 Pcs
                .col
                    .d-flex.justify-content-end            
                        el-button(icon="el-icon-delete" size="small") 
                        el-button(type="warning" size="small") Beli 
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
