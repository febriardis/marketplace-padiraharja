<template lang="pug">
    .listing-skeleton
        .mb-2(v-for="item in count" :key="item")
            .d-flex.listng-skeleton
                .mr-3
                    Skeleton(height="80px" width="80px")
                .w-100
                    Skeleton.mt-2
                    Skeleton.mt-2
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 5,
    },
  },
}
</script>

<style lang="scss">
.listng-skeleton {
  padding: 8px;
  margin: 10px 5px;
  border-radius: 10px;
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
}
</style>
