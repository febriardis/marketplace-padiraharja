<template lang="pug">
    .category-carousel
        carousel.category(
            navigationNextLabel="<i class='el-icon-arrow-right'></i>",
            navigationPrevLabel="<i class='el-icon-arrow-left'></i>",
            :navigationEnabled='true',
            :per-page-custom='[[320, 6], [641, 6], [1024, 6]]',
            :space-padding='4',
            :pagination-enabled='false')
            slide(v-for="(item, index) in categories", :key="index")
              a.card-category(href="javascript:void(0)" @click="innerValue = item.id" :class="{'active' : innerValue === item.id}")
                | {{item.name}}
                .underline(v-if="innerValue === item.id")
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      categories: [],
    }
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  watch: {
    categories(value) {
      if (value.length > 0) {
        this.innerValue = value[0].id
      }
    },
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      const response = await this.$api.fetchData('/public/product_category')
      if (response.status === 200) {
        this.categories = response.data.data
      }
    },
  },
}
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
  // width: max-content;
  .underline {
    border: 1px solid #ffffff;
    background: #ffffff;
    margin-top: 3px;
    width: 40%;
  }
  &.active {
    background: #dd0206;
    color: #ffffff;
    border: none;
  }
}

@media (max-width: 769px) {
  .card-category {
    width: max-content;
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
