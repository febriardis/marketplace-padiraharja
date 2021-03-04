<template lang="pug">
    .other-info
      h3.mb-0
        | Pesanan Anda
      .row.text-color-gray.border-bottom
        .col-8
          h4.mb-2 Detail Produk
        .col-4.text-right
          h4.mb-2 Subtotal
      .row.text-size-small.text-color-gray.border-bottom
        .col-8
          p Pants: {{attrDetail.styleDetail ? attrDetail.styleDetail.name : ''}}
          p Cutting: {{attrDetail.cuttings ? attrDetail.cuttings.name : ''}}
          p Fabric: {{attrDetail.fabrics ? attrDetail.fabrics.name : ''}}
          p Stitch: {{attrDetail.stitches ? attrDetail.stitches.name : ''}}
          p Size: {{attrDetail.sizes ? attrDetail.sizes.size : ''}}
        .col-4.text-right
          p.font-weight-500 Rp. {{ attrDetail.styleDetail ? attrDetail.styleDetail.base_price : 0 | price}}
          p.font-weight-500 Rp. {{ attrDetail.cuttings ? attrDetail.cuttings.price : 0 | price}}
          p.font-weight-500 Rp. {{ attrDetail.fabrics ? attrDetail.fabrics.price : 0 | price}}
          p.font-weight-500 Rp. {{ attrDetail.stitches ? attrDetail.stitches.price : 0 | price}}
          p.font-weight-500 Rp. {{ attrDetail.sizes ? attrDetail.sizes.price : 0 | price}}

      .row.text-size-small.border-bottom
        .col-6
          p.text-color-gray.font-weight-bold Subtotal
        .col-6.text-right
          p.font-weight-500 Rp. {{subtotal | price}}

      .row.text-size-mini.align-items-center
        .col-6
          p.text-color-gray.font-weight-bold Pengiriman
        .col-6.text-right
          p.text-color-gray.font-weight-light.text-danger(v-if="!subdistrictId") 
            | Silahkan masukan alamat pengiriman.
          el-cascader(
            v-else
            :props="state.courierCascader" 
            v-model="state.courierSelected" 
            size="mini" 
            placeholder="Pilih Kurir")
 
      .row.text-size-mini.border-bottom
        .col-6
          p.text-color-gray(v-if="state.courierSelected[1]")
            | Estimasi Durasi: {{ state.courierSelected[1].cost[0].etd }} {{ state.courierSelected[0] !== 'pos' ? 'Hari' : ''}}
        .col-6.text-right
          p.font-weight-500(v-if="state.courierSelected[1]")
            | Rp. {{ state.courierSelected[1].cost[0].value | price }}

      .row.text-size-small.border-bottom
        .col-6
          p.text-color-gray.font-weight-bold Total
        .col-2
          p x{{quantity}}
        .col-4.text-right
          p.font-weight-bold Rp. {{totalOrder | price}}

      .row.text-size-small.mt-3.mb-3
          .col-12
            slot
            small.text-color-gray
              | Your personal data will be used to process your order, support your experience throughout this website, and for other purpose described in our 
              a(href="#") privacy policy.
</template>

<script>
// import { LOGISTICS } from '@/static/data'
import { computed, reactive, watch, onMounted } from '@nuxtjs/composition-api'
import { utilities } from '@/controllers/utilities'

export default {
  props: {
    attrDetail: {
      type: Object,
      default: null,
    },
    quantity: {
      type: [Number, String],
      default: null,
    },
    subdistrictId: {
      type: [Number, String],
      default: null,
    },
    value: {
      type: Object,
      default: null,
    },
  },
  setup(props, ctx) {
    const { couriers, fetchCouriers } = utilities()
    const state = reactive({
      courierSelected: [],
      logisticList: [],
      courierCascader: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(async () => {
            let nodes
            const _this = ctx.root
            const parent = couriers.list
            if (level === 0) {
              nodes = parent
            } else if (level === 1) {
              const child = []
              const children = await fetchLogisticCost(node.data.value)
              children.forEach((el) => {
                child.push({
                  label: `${el.service} - Rp. ${_this.$filters.price(
                    el.cost[0].value
                  )}`,
                  value: el,
                  leaf: true,
                })
              })
              nodes = child
            }
            resolve(nodes)
          }, 800)
        },
      },
    })

    watch(
      () => state.courierSelected,
      (value) => {
        if (value.length !== 0) {
          ctx.emit('input', {
            courier: `${value[0]} - ${value[1].service}`,
            courier_cost: value[1].cost[0].value,
          })
        }
      }
    )

    const subtotal = computed(() => {
      const attr = props.attrDetail
      let total = 0
      if (
        attr.styleDetail &&
        attr.stitches &&
        attr.cuttings &&
        attr.fabrics &&
        attr.sizes
      ) {
        total =
          attr.styleDetail.base_price +
          attr.stitches.price +
          attr.cuttings.price +
          attr.fabrics.price +
          attr.sizes.price
      }
      return total
    })

    const totalOrder = computed(() => {
      let total = subtotal.value * props.quantity
      if (state.courierSelected.length > 0) {
        total += state.courierSelected[1].cost[0].value
      }
      return total
    })

    const fetchLogisticCost = async (courier) => {
      const _this = ctx.root
      if (props.subdistrictId) {
        const weight = props.attrDetail.fabrics
          ? props.attrDetail.fabrics.weight
          : 0
        const response = await _this.$api.postData('/orders/logistic_cost', {
          destination: props.subdistrictId,
          weight: weight * props.quantity,
          courier,
        })
        if (response.status === 200) {
          return response.data.data
        } else {
          return response.data.data
        }
      } else {
        _this.$message({
          type: 'warning',
          message: 'Silahkan masukan alamat pengiriman',
        })
        return []
      }
    }

    onMounted(() => {
      fetchCouriers()
    })

    return {
      state,
      subtotal,
      couriers,
      totalOrder,
    }
  },
}
</script>

<style lang="scss">
.font-weight-500 {
  font-weight: 500;
}
</style>
