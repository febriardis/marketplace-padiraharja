<template lang="pug">
    .product-detail.mt-3(v-if="product")
        .row
            .col-md-5.col-sm-5
                img.w-100.img-detail(:src="product.photo")
            .col
                h3.mb-0 {{product.name}}
                h2.mt-2 Rp. {{product.price | price}}
            
                .product-detail
                    p.font-weight-bold.mt-0.mb-2 Informasi Produk
                    p.mt-0.mb-2 {{product.description}}

                .product-detail.border-top.pt-2.mt-2
                    p.font-weight-bold.mt-0.mb-2 Informasi Penjual
                    .row
                        .col-md-8
                            .d-flex.align-items-center
                                .img-seller.mr-3
                                    img(:src="product.merchant.logo" width="45" height="45")
                                .detail-seller
                                    h3.mt-0.mb-1 {{product.merchant.name}}
                                    p.text-color-gray.text-size-small.m-0.text-capitalize {{product.merchant.city.name + ', ' + product.merchant.province.name | lowercase}}
                        .col.text-right
                            el-button(type="primary" size="small")
                              | Hubungi Penjual

                .web-action.border-top.mt-3
                    section.quantity-input
                        p.text-size-small.text-color-gray Kuantitas:
                        el-input-number(
                            size="medium"
                            v-model="quantity"
                            :min="1" 
                            :max="parseInt(product.stock)")
                    .row.mt-3
                        .col-md-4
                            el-button.w-100(type="warning" @click="submit('cart')")
                              | + Keranjang
                        .col-md-4
                            .show-on-mobile.mt-2
                            el-button.w-100(type="primary")
                              | Beli

        .action-card
        
    
</template>

<script>
export default {
  data: () => ({
    product: null,
    quantity: 1,
  }),
  computed: {
    productId() {
      return this.$route.params.slug
    },
  },
  mounted() {
    this.fetchProductDetail()
  },
  methods: {
    async submit(type) {
      await this.$api.postData(`/${type}`, {
        product_id: this.product.id,
        quantity: this.quantity,
      })
    },
    async fetchProductDetail() {
      const response = await this.$api.fetchData(`/product/${this.productId}`)
      if (response.status === 200) {
        this.product = response.data.data
      }
    },
  },
}
</script>

<style lang="scss">
@media (min-width: 769px) {
  .img-detail {
    height: 450px;
  }
}

@media (max-width: 769px) {
  .img-detail {
    height: 300px;
  }
}
</style>
