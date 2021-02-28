<template lang="pug">
  .selectable-text     
    button.selectable-box(
      type="button"
      :disabled="isLoading || isModelLoaded"
      v-for="(item, index) in items" 
      :class="{'active' : selected === item.id}"
      @click="innerValue = item, selected = item.id"
      :key="index")
      | {{item.name}}

</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    value: {
      type: [Object, Number],
      default: null,
    },
    isModelLoaded: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    selected: 0,
  }),

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
    innerValue: {
      deep: true,
      handler(value) {
        if (value) {
          this.selected = value.id
        }
      },
    },
  },
}
</script>

<style lang="scss">
.selectable-text {
  overflow: auto;
  white-space: nowrap;
  padding-bottom: 8px;
  .selectable-box {
    display: inline-block;
    padding: 6px 20px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-right: 8px;
    text-decoration: none;
    font-weight: bold;
    color: #000000;
    outline: none;
    cursor: pointer;
    border: none;
    &.active {
      background-color: #c4c4c4;
      // color: #ffffff;
      border: none;
      box-shadow: 0px 2px 0.9px rgba(255, 255, 255, 0.3),
        0px 4px 6px rgba(255, 255, 255, 0.09),
        0px 1px 2px rgba(255, 255, 255, 0.08);
    }
    &:focus {
      border: none;
    }
    &:disabled {
      opacity: 0.6;
      cursor: wait;
    }
    &.circle {
      border-radius: 100%;
      padding: 16px 25px;
    }
  }
}
</style>
