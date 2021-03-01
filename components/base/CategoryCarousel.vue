<template lang="pug">
    .category-carousel
        carousel.category(
            navigationNextLabel="<i class='el-icon-arrow-right'></i>",
            navigationPrevLabel="<i class='el-icon-arrow-left'></i>",
            :navigationEnabled='true',
            :per-page-custom='[[320, 6], [641, 6], [1024, 6]]',
            :space-padding='4',
            :pagination-enabled='false')
            slide(v-for="(item, index) in 3", :key="index")
              a.card-category(href="#" :class="{'active' : item === 1}")
                | Kategori{{item}}
                .underline(v-if="item === 1")
</template>

<script>
export default {}
</script>

<style lang="scss">
.card-category {
  border: 1px solid #cfcfcf;
  background: #ffffff;
  color: #777777;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 0 5px;
  display: block;
  .underline {
    border: 1px solid #ffffff;
    background: #ffffff;
    margin-top: 3px;
    width: 40%;
  }
  &.active {
    background: red;
    color: #ffffff;
    border: none;
  }
}
.category-carousel {
  .category {
    .VueCarousel-wrapper {
      padding: 10px 0;
      .VueCarousel-inner {
        align-items: center;
      }
    }
  }
}
</style>
