<template lang="pug">
  el-cascader(
    v-bind="$attrs"
    :props="state.courierCascader" 
    v-model="innerValue" 
    size="small" 
    placeholder="Pilih Kurir")
</template>

<script>
import { utilities } from '@/controllers/utilities'
import { computed, onMounted, reactive } from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    weight: {
      type: Number,
      default: null,
    },
    quantity: {
      type: Number,
      default: null,
    },
    addressData: {
      type: Object,
      default: null,
    },
    originAddress: {
      type: Object,
      default: null,
    },
  },

  setup(props, { emit, root }) {
    const { couriers, fetchCouriers } = utilities()

    const state = reactive({
      courierCascader: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(async () => {
            let nodes
            const _this = root
            const parent = couriersParsed.value
            if (level === 0) {
              nodes = parent
            } else if (level === 1) {
              const child = []
              const children = await fetchLogisticCost(node.data.value)
              if (children) {
                children.cost.forEach((service) => {
                  service.costs.forEach((el) => {
                    child.push({
                      label: `${el.service} - Rp. ${_this.$filters.price(
                        el.cost[0].value
                      )}`,
                      value: el,
                      leaf: true,
                    })
                  })
                })
                nodes = child
              }
            }
            resolve(nodes)
          }, 800)
        },
      },
    })

    const fetchLogisticCost = async (courier) => {
      const response = await root.$api.postData('/raja-ongkir/cost', {
        origin: props.originAddress
          ? props.originAddress.subdistrict.subdistrict_id
          : null,
        originType: 'subdistrict',
        destination: props.addressData.district_id.subdistrict_id,
        destinationType: 'subdistrict',
        weight: props.weight ? props.weight * props.quantity : '2000',
        courier,
      })
      if (response.status === 200) {
        const data = response.data.data
        const findCourier = couriers.list.find((el) => el.code === courier)
        emit('change', {
          courier_id: findCourier.id,
          originType: data.origin_details.type,
        })
        return data
      } else {
        return null
      }
    }

    const couriersParsed = computed(() => {
      const result = []
      couriers.list.forEach((courier) => {
        result.push({
          label: courier.name,
          value: courier.code,
          leaf: false,
        })
      })
      return result
    })

    const innerValue = computed({
      get: () => {
        return props.value
      },
      set(newValue) {
        emit('input', newValue)
      },
    })

    onMounted(() => {
      fetchCouriers()
    })

    return {
      state,
      couriers,
      innerValue,
    }
  },
}
</script>
