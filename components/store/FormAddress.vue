<template lang="pug">
  .form-address
    h3.mb-0 Alamat Pengiriman Toko
    p.mt-2.mb-2.text-color-gray Atur alamat toko anda sebagai alamat kirim untuk menentukan biaya servis kurir pengiriman.
    el-form(
        :model="form"
        :rules="rules"
        ref="refForm"
        )
        el-form-item(prop="address" label="Alamat")
          el-input(type="textarea" v-model="form.address" placeholder="Silahkan masukan alamat lengkap anda")
        el-form-item(prop="province_id" label="Provinsi")
          //- pre
            | form.province_id {{form.province_id}}
          SearchProvinceROField(v-model="form.province_id")
        .row
            .col-md-6
                el-form-item(prop="city_id" label="Kabupaten/Kota")
                  SearchCityROField(v-model="form.city_id" :province-id="form.province_id")
            .col-md-6
                el-form-item(prop="subdistrict_id" label="Kecamatan")
                  SearchDistrictROField(v-model="form.subdistrict_id" :city-id="form.city_id")
        .mt-3.text-right
            el-button(type="primary" @click="submitForm()" v-loading.fullscreen.lock="response.isLoading") Simpan

</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, ref, watch } from '@nuxtjs/composition-api'
export default {
  setup() {
    const { form: response, postData, result, fetchData } = handler()

    const state = reactive({
      address_data: null,
    })

    const form = reactive({
      address: null,
      province_id: null,
      city_id: null,
      subdistrict_id: null,
      // latitude: null,
      // longitude: null,
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
      subdistrict_id: [
        {
          required: true,
          message: 'Please select your district',
          trigger: 'change',
        },
      ],
    })

    const refForm = ref(null)

    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          const url = !state.address_data
            ? '/user/merchant'
            : '/user/merchant/update'
          postData(url, form)
        }
      })
    }

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          const data = value.response.data

          console.log('data', data)

          form.address = data.address
          form.province_id = data.province ? data.province.province_id : null

          setTimeout(() => {
            form.city_id = data.city ? data.city.city_id : null
          }, 500)
          setTimeout(() => {
            form.subdistrict_id = data.subdistrict_id
              ? data.subdistrict.subdistrict_id
              : null
          }, 500)
        }
      },
      { deep: true }
    )

    function fetchAddress() {
      fetchData('/raja-ongkir/origin-address')
    }

    onMounted(() => {
      fetchAddress()
    })

    return {
      form,
      rules,
      refForm,
      submitForm,
      response,
    }
  },
}
</script>
