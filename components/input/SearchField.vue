<template>
  <el-autocomplete
    v-model="innerValue"
    class="inline-input search-width"
    :fetch-suggestions="querySearch"
    size="small"
    placeholder="Cari sesuatu di Padiraharja"
    :trigger-on-focus="false"
    @select="handleSelect"
  >
    <i slot="suffix" class="el-icon-search el-input__icon"> </i>
  </el-autocomplete>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      links: [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' },
      ],
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

  methods: {
    handleSelect(item) {
      // console.log(item)
    },
    querySearch(queryString, cb) {
      const links = this.links
      const results = queryString
        ? links.filter(this.createFilter(queryString))
        : links
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
  },
}
</script>
