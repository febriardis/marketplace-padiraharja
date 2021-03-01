<template lang="pug">
    el-dialog(
        title="Pilih Alamat"
        :visible.sync="isListDialog"
        width="500px")
            .address-list
                a(v-for="item in addressList" :key="item.id" href="javascript:void(0)" @click="selectedAddress = item")
                    .address-item.text-size-small.text-color-gray(:class="{'active': selectedAddress.id === item.id }")
                        p.font-weight-bold.mb-1 {{item.fullname}}
                        p.mt-2.mb-1 {{item.title}}
                        p.mt-2.mb-1 {{item.phone}}
                        p.mt-2 {{item.address}}, {{item.city_name}}, {{item.village}}, {{item.postal_code}}

            .text-right
                el-button.mt-3(
                    type="primary"
                    @click="isListDialog = false")
                    | OKE
</template>

<script>
import { computed, reactive } from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    addressList: {
      type: Array,
      default: () => [],
    },
    addressSelected: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    // const { result, fetchData } = handler()
    const state = reactive({
      data: [],
    })

    const selectedAddress = computed({
      get: () => {
        return props.addressSelected
      },
      set: (val) => {
        emit('update:addressSelected', val)
      },
    })

    const isListDialog = computed({
      get: () => {
        return props.value
      },
      set: (val) => {
        emit('input', val)
      },
    })

    return {
      state,
      isListDialog,
      selectedAddress,
    }
  },
}
</script>

<style lang="scss" scoped>
.address-list {
  overflow-x: auto;
  height: calc(100vh - 300px);
  .address-item {
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    margin-bottom: 5px;
    padding: 3px 15px;
    &.active,
    &:hover {
      border: 2px solid #57a5e6;
      background: #edf5fc;
      color: #57a5e6;
    }
  }
}
</style>
