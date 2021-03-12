<template lang="pug">
    .product-list
        .row.align-items-center
            .col
              h3.mb-0 Produk Toko
              p.mt-2.mb-0.text-color-gray Atur produk yang tersedia di toko anda.
            .col.text-right
                el-button(size="small" @click="state.productData = null, state.isDialog = true" plain icon="el-icon-plus")
                    | Tambah Produk
        .order-head
            .row
                .col-md-3
                    | Produk
                .col.text-center
                    | Kategori
                .col.text-center
                    | Stok
                .col.text-center
                    | Harga
                .col.text-center
                    | Tanggal Dibuat
                .col.text-center
                    | Aksi

        p.text-center(v-if="state.products.length === 0")
            | No Data
        
        .order-content.text-size-small(v-for="(item, key) in state.products" :key="key" v-else)
            .row.align-items-center
                .col-3.border-right
                    .d-flex.align-items-center
                        .product-image.mr-3
                            img(:src="item.photo" width="40" height="40")
                        .product-detail
                            p.font-weight-bold.m-0 {{item.name}}
                .col.text-center.border-right
                    p.text-color-gray.m-0 {{ item.productCategory.name }}
                .col.text-center.border-right
                    p.text-color-gray.m-0 {{ item.stock | price }}
                .col.text-center.border-right
                    p.text-color-gray.m-0 {{ item.price | price }}
                .col.text-center.border-right
                    p.text-color-gray.m-0 {{ item.created_at | formatDate('DD-MM-YYYY') }}
                .col.text-center
                    .d-flex
                        el-button(type="primary" @click="state.productData = item, state.isDialog = true" size="mini" plain icon="el-icon-edit")
                        el-button(type="danger" @click="deleteProduct(item.id)" size="mini" icon="el-icon-delete")
        .card-custom.p-2.mt-1(v-if="state.pagination")
          CPagination(v-model="filters.page" :total-page="state.pagination.total_page")
        
        FormProduct(
            v-model="state.isDialog"
            :product-data="state.productData"
            @change="fetchProducts" 
            v-if="state.isDialog")
            
        LoadingScreen(v-if="deleted && deleted.isLoading")
</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'

export default {
  setup(_, { root }) {
    const { result, fetchData, form: deleted, deleteData } = handler()

    const state = reactive({
      products: [],
      pagination: null,
      isDialog: false,
      productData: null,
    })
    const filters = reactive({
      limit: 10,
      page: 0,
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          const data = value.response
          state.products = data.data
          state.pagination = {
            page: parseInt(data.paging.page),
            total_page: parseInt(data.paging.total_page),
          }
        }
      },
      { deep: true }
    )

    watch(
      () => deleted,
      (value) => {
        if (value.isSuccess) {
          fetchProducts()
        }
      },
      { deep: true }
    )

    function deleteProduct(id) {
      const _this = root
      _this
        .$confirm('Apakah anda yakin akan menghapus produk ini?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
        .then(() => {
          deleteData(`/product/${id}`)
        })
        .catch(() => {
          // console.log('cancel')
        })
    }

    function fetchProducts() {
      fetchData('/product', filters)
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      state,
      deleted,
      filters,
      deleteProduct,
      fetchProducts,
    }
  },
}
</script>

<style lang="scss">
.order-head {
  background: #f6f6f6;
  color: #747474;
  padding: 10px;
  margin-top: 15px;
  border-radius: 4px;
}
.order-content {
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
