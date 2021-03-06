<template lang="pug">
    el-dialog(
        :title="`${productData ? 'Edit' : 'Tambah'} Produk`"
        :visible.sync="isDialog"
        width="500px")
        el-form(
            :model="form"
            :rules="rules"
            ref="refForm"
            )
            el-form-item(prop="name" label="Nama Produk")
                el-input(type="text" v-model="form.name" placeholder="Masukkan nama produk")
            el-form-item(prop="product_category_id" label="Kategori")
                SelectCategoryField(v-model="form.product_category_id")
            el-form-item(prop="price" label="Harga")
                el-input(type="text" v-model="form.price" placeholder="Masukkan harga produk")
            el-form-item(prop="stock" label="Stok")
                el-input(type="text" v-model="form.stock" placeholder="Masukkan stok produk")
            el-form-item(prop="weight" label="Berat (gram)")
                el-input(type="text" v-model="form.weight" placeholder="Masukkan berat produk")
            el-form-item(prop="description" label="Deskripsi")
                el-input(type="textarea" v-model="form.description" placeholder="Masukkan deskripsi produk")
            el-form-item(label="Logo")
                UploadImageField(v-model="form.photo" width="120px" height="120px" :previewImage="productData ? productData.photo : null")
            
            .mt-3.text-right
                el-button(type="primary" @click="submitForm()" v-loading.fullscreen.lock="response.isLoading") Simpan

</template>

<script>
import { handler } from '@/controllers/handler'
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    productData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { form: response, postData } = handler()

    const form = reactive({
      name: null,
      product_category_id: null,
      price: null,
      stock: null,
      weight: null,
      description: null,
      photo: null,
    })

    const rules = reactive({
      name: [
        {
          required: true,
          message: 'Please input product name',
          trigger: 'change',
        },
      ],
      product_category_id: [
        {
          required: true,
          message: 'Please select category',
          trigger: 'change',
        },
      ],
      price: [
        {
          required: true,
          message: 'Please input price',
          trigger: 'change',
        },
      ],
      stock: [
        {
          required: true,
          message: 'Please input stock',
          trigger: 'change',
        },
      ],
      weight: [
        {
          required: true,
          message: 'Please input weight',
          trigger: 'change',
        },
      ],
      description: [
        {
          required: true,
          message: 'Please type description',
          trigger: 'change',
        },
      ],
    })

    const refForm = ref(null)

    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          const fd = new FormData()
          Object.entries(form).forEach((data) => {
            if (data[1]) {
              fd.append(data[0], data[1])
            }
          })
          const url = !props.productData
            ? '/product'
            : `/product/${props.productData.id}`
          postData(url, fd)
        }
      })
    }

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          emit('input', false)
          emit('change')
        }
      },
      { deep: true }
    )

    const isDialog = computed({
      get: () => {
        return props.value
      },
      set: (val) => {
        emit('input', val)
      },
    })

    onMounted(() => {
      const product = props.productData
      if (product) {
        form.name = product.name
        form.product_category_id = product.productCategory.id
        form.price = product.price
        form.stock = product.stock
        form.weight = product.weight
        form.description = product.description
      }
    })

    return {
      form,
      rules,
      refForm,
      submitForm,
      response,
      isDialog,
    }
  },
}
</script>
