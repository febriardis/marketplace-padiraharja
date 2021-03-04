<template>
  <el-autocomplete
    v-model="innerValue"
    class="inline-input search-width search-product"
    :fetch-suggestions="querySearch"
    size="small"
    placeholder="Cari sesuatu di Padiraharja"
    :trigger-on-focus="false"
    @select="handleSelect"
  >
    <i slot="suffix" class="el-icon-search el-input__icon"> </i>
    <template slot-scope="{ item }">
      <div class="d-flex align-items-center">
        <div class="product-image mr-3">
          <img :src="item.photo" width="50px" height="50px" />
        </div>
        <div class="info-detail">
          <p class="m-0 mb-2 text-size-small">{{ item.value }}</p>
          <p class="m-0 text-size-mini text-capitalize text-color-gray">
            {{ item.merchant ? item.merchant.city.name : null | lowercase }}
          </p>
        </div>
      </div>
    </template>
  </el-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      innerValue: null,
      products: [],
    }
  },

  mounted() {
    this.fetchProducts()
  },

  methods: {
    handleSelect(item) {
      this.$router.push({ name: 'product-slug', params: { slug: item.link } })
    },
    async querySearch(queryString, cb) {
      const products = this.products
      const results = queryString
        ? await this.fetchProducts(queryString)
        : products
      // call callback function to return suggestions
      cb(results)
    },
    async fetchProducts(queryString) {
      const response = await this.$api.fetchData('/product/product/all', {
        name: queryString,
      })
      if (response.status === 200) {
        const data = []
        response.data.data.forEach((el) => {
          data.push({
            value: el.name,
            link: el.id,
            ...el,
          })
        })
        if (queryString) {
          return data
        } else {
          this.products = data
        }
      }
    },
  },
}
</script>

<style lang="scss">
.el-autocomplete-suggestion li {
  padding: 5px 20px;
  line-height: unset;
  border-bottom: 1px solid;
}
</style>
