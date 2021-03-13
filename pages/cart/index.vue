<template lang="pug">
    .cart.mt-4
        h2 Keranjang
        ListingSkeleton(v-if="isLoading")
        p.m-0.text-center(v-else-if="carts.length === 0") Keranjang Kosong
        el-card.mb-2(class="box-card" v-for="(item, key) in carts" :key="key" v-else)
            h3.mt-0.mb-2 Produk
            .row
                .col-md-1.col-3
                    .product-img
                        img(:src="item.product.photo" width="70" height="70")
                .col-md-4.col-5
                    p.font-weight-bold.m-0 {{item.product.name}}
                    .mt-2.pb-2.d-flex.justify-content-between
                        p.m-0.text-price.font-weight-bold Rp. {{item.product.price | price}}
                        p.m-0 {{item.quantity}} Pcs
                .col
                    .d-flex.justify-content-end            
                        el-button(icon="el-icon-delete" @click="deleteCart(item)" size="small") 
                        el-button(type="warning" @click="checkout(item)" size="small") Beli 
        //- bottom navigation
        BottomNavigation
</template>

<script>
export default {
  middleware: 'authenticated',
  components: {
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
  },

  data: () => ({
    carts: [],
    isLoading: false,
  }),

  mounted() {
    this.fetchUserCart()
  },

  methods: {
    checkout(item) {
      this.$router.push({
        name: 'checkout',
        query: {
          product_id: item.product.id,
          quantity: item.quantity,
        },
      })
    },

    async deleteCart(item) {
      const response = await this.$api.deleteData(`/cart/${item.id}`, {
        product_id: item.product.id,
        quantity: item.quantity,
      })
      if (response.status === 200) {
        this.fetchUserCart()
      }
    },

    async fetchUserCart() {
      this.isLoading = true
      const response = await this.$api.fetchData('/cart')
      if (response.status === 200) {
        this.carts = response.data.data
        const count = this.carts.length > 0 ? this.carts.length : null
        this.$store.commit('user/SET_CART_COUNT', count)
        this.isLoading = false
      }
    },
  },
}
</script>
