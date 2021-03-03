<template lang="pug">
    a.product-info(href="javascript:void(0)" @click="$router.push({ name: 'product-slug', params: {slug: product.id} })" v-if="product")
        .product-image
          img(:src="product.photo" class="product-img")
        .info-detail
            p.font-weight-bold.m-0 {{product.name}}
            .mt-2.pb-2.d-flex.justify-content-between
                p.m-0 Rp. {{product.price | price}}
                p.m-0 Stok: {{product.stock}}
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.product-info {
  color: #000000;
  display: block;
  margin: 0 5px;
  width: 182.22px;
  border-radius: 10px;
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
  &:hover {
    color: #000000;
  }
  .product-image {
    height: 180px;
  }
  .info-detail {
    margin: 10px;
  }
}
</style>
