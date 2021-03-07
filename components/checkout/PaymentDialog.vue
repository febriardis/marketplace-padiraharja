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
          el-form-item(prop="address" label="Alamat")
            el-input(type="textarea" v-model="form.address" placeholder="Silahkan masukan alamat lengkap anda")
          el-form-item(prop="province_id" label="Provinsi")
            SearchProvinceROField(v-model="form.province_id" data-value="object")
          .row
            .col-md-6
              el-form-item(prop="city_id" label="Kabupaten/Kota")
                SearchCityROField(v-model="form.city_id" :province-id="form.province_id ? form.province_id.province_id : null" data-value="object")
            .col-md-6
              el-form-item(prop="district_id" label="Kecamatan")
                SearchDistrictROField(v-model="form.district_id" :city-id="form.city_id ? form.city_id.city_id : null" data-value="object")
          .mt-3.text-right
            el-button(type="primary" @click="submitForm()" v-loading.fullscreen.lock="state.isLoading") Simpan
</template>

<script>
import { computed, reactive, ref, watch } from '@nuxtjs/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    addressData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const refForm = ref(null)

    const state = reactive({
      isLoading: false,
    })

    const form = reactive({
      address: null,
      province_id: null,
      city_id: null,
      district_id: null,
    })

    const rules = reactive({
      address: [
        {
          required: true,
          message: 'Please input your address',
          trigger: 'change',
        },
      ],
      province_id: [
        {
          required: true,
          message: 'Please select your province',
          trigger: 'change',
        },
      ],
      city_id: [
        {
          required: true,
          message: 'Please select your city',
          trigger: 'change',
        },
      ],
      district_id: [
        {
          required: true,
          message: 'Please select your district',
          trigger: 'change',
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
          // form.title = value.title
          // form.fullname = value.fullname
          // form.phone = value.phone
          // form.address = value.address
          // form.cityId = value.cityId
        }
      },
      { deep: true }
    )

    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          state.isLoading = true
          emit('change', form)
          emit('input', false)
          state.isLoading = false
        }
      })
    }

    return {
      state,
      form,
      rules,
      refForm,
      submitForm,
      isAddDialog,
    }
  },
}
</script>
