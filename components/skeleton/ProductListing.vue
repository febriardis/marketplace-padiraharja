<template lang="pug">
  .row
    .col-lg-2.col-md-3.col-sm-6.col-6(v-for="item in count" :key="item")
      .product-skeleton.w-100
          Skeleton(height="150px")
          Skeleton.mt-2
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 12,
    },
  },
}
</script>

<style lang="scss">
.product-skeleton {
  padding: 5px;
  margin: 10px 5px;
  width: 182.22px;
  border-radius: 10px;
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
}
</style>
