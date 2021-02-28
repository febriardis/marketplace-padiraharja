<template lang="pug">
    el-dialog(
        title="Tambah Alamat"
        :visible.sync="isAddDialog"
        width="500px")
        el-form(
            :model="form"
            :rules="rules"
            ref="refForm"
        )
            el-form-item(prop="title" label="Judul (cth. Rumah, Kantor) ")
                el-input(type="text" ref="refFirstField" v-model="form.title" placeholder="Masukan judul alamat")
            
            .row
                .col
                    el-form-item(prop="fullname" label="Nama Penerima")
                        el-input(type="text" v-model="form.fullname" placeholder="Masukan nama penerima")
                .col
                    el-form-item(prop="phone" label="No Hp")
                        el-input(type="number" v-model="form.phone" placeholder="Mohon isi nomor handphone anda")
            
            el-form-item(prop="address" label="Alamat")
                el-input(type="textarea" v-model="form.address" placeholder="Masukan alamat lengkap anda")

            .row
                .col
                  el-form-item(prop="cityId" label="Kota")
                    f-search-location(v-model="form.cityId" @input="fetchSubdistrict()")
                .col
                  el-form-item(prop="subdistrictId" label="Kecamatan")
                    el-select(v-model="form.subdistrictId" filterable default-first-option)
                      el-option(
                        v-for="item in state.subdistricts"
                        :key="item.subdistrict_id"
                        :label="item.subdistrict_name"
                        :value="item.subdistrict_id")
            .row
                .col
                    el-form-item(prop="village" label="kelurahan")
                        el-input(type="text" v-model="form.village" placeholder="Masukan nama kelurahan")
                .col
                    el-form-item(prop="postal_code" label="Kode Pos")
                        el-input(type="text" v-model="form.postal_code" placeholder="Masukan kode pos")
              
            .text-right
                el-button.mt-3(
                    type="primary"
                    :loading="state.isLoading"
                    v-loading.fullscreen.lock="response.isLoading"
                    @click="submitForm()")
                    | SIMPAN
</template>

<script>
import { computed, reactive, ref, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'
export default {
  components: {
    LoginForm: () => import('@/components/auth/LoginForm'),
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    newAddress: {
      type: Boolean,
      default: false,
    },
    addressData: {
      type: Object,
      default: null,
    },
    addressSelected: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const refForm = ref(null)

    const { form: response, postData, patchData, result, fetchData } = handler()
    const state = reactive({
      isLoading: false,
      subdistricts: [],
    })

    const form = reactive({
      title: null,
      fullname: null,
      phone: null,
      address: null,
      cityId: null,
      subdistrictId: null,
      village: null,
      postal_code: null,
    })

    const rules = reactive({
      title: [
        {
          required: true,
          message: 'Silahkan masukan judul',
          trigger: 'blur',
        },
      ],
      fullname: [
        {
          required: true,
          message: 'Silahkan masukan nama penerima',
          trigger: 'blur',
        },
      ],
      phone: [
        {
          required: true,
          message: 'Silahkan masukan no handphone',
          trigger: 'blur',
        },
      ],
      address: [
        {
          required: true,
          message: 'Silahkan masukan alamat',
          trigger: 'blur',
        },
      ],
      cityId: [
        {
          required: true,
          message: 'Silahkan masukan kota',
          trigger: 'blur',
        },
      ],
      subdistrictId: [
        {
          required: true,
          message: 'Silahkan masukan kota',
          trigger: 'blur',
        },
      ],
      village: [
        {
          required: true,
          message: 'Silahkan masukan kelurahan',
          trigger: 'blur',
        },
      ],
      postal_code: [
        {
          required: true,
          message: 'Silahkan masukan kode pos',
          trigger: 'blur',
        },
      ],
    })

    const isAddDialog = computed({
      get: () => {
        return props.value
      },
      set: (val) => {
        emit('input', val)
      },
    })

    watch(
      () => props.addressData,
      (value) => {
        if (value) {
          form.title = value.title
          form.fullname = value.fullname
          form.phone = value.phone
          form.address = value.address
          form.cityId = value.cityId
        }
      },
      { deep: true }
    )

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.subdistricts = value.response.data
        }
      },
      { deep: true }
    )
    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          refForm.value.resetFields()
          emit('input', false)
          emit('update:newAddress', true)
          emit('update:addressSelected', value.response.data)
        }
        state.isLoading = false
      },
      { deep: true }
    )

    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          state.isLoading = true
          props.addressData ? update() : submit()
        }
      })
    }

    const isLoggedIn = computed(() => {
      return !!localStorage.getItem('token')
    })

    function submit() {
      const endPoint = isLoggedIn.value ? '/addresses' : `/addresses/guest`
      postData(endPoint, form)
    }

    function update() {
      patchData(`/addresses/${props.addressData.id}`, form)
    }

    function fetchSubdistrict() {
      fetchData('/addresses/subdistricts', {
        city_id: form.cityId,
      })
    }

    return {
      state,
      form,
      rules,
      refForm,
      submitForm,
      isAddDialog,
      response,
      fetchSubdistrict,
    }
  },
}
</script>
