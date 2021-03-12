<template lang="pug">
  .d-flex.align-items-center
    el-button(type="button" :disabled="value === 0" @click="count -= 1")
      i.fas.fa-chevron-left
    el-button(type="button" :disabled="value === totalPage - 1" @click="count += 1")
      i.fas.fa-chevron-right
    .d-flex.align-items-center.ml-3
      p.m-0.mr-2 Page
      el-input-number.text-center.w-25(v-model="value" :controls="false" :min="0" :max="totalPage - 1")
      p.m-0.ml-3(v-if="totalPage") Total Page: {{ totalPage }}</p>
      p.m-0(v-if="totalRecord") Total Record: {{ totalRecord }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalPage: {
      type: Number,
      default: null,
    },
    totalRecord: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    value: 0,
  }),
  computed: {
    count: {
      get() {
        return parseInt(this.value)
      },
      set(val) {
        this.value = val
      },
    },
  },
  watch: {
    value(newValue) {
      this.$emit('input', newValue)
    },
  },
}
</script>
