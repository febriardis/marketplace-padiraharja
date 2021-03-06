<template lang="pug">
  .form-store
    h3.mb-0 Profil Toko
    p.mt-2.mb-2.text-color-gray Isi data toko anda dengan lengkap.
    el-form(
        :model="form"
        :rules="rules"
        ref="refForm"
        )
        el-form-item(prop="name" label="Nama")
            el-input(type="text" v-model="form.name" placeholder="Silahkan masukan nama lengkap anda")
        el-form-item(prop="address" label="Alamat")
            el-input(type="textarea" v-model="form.address" placeholder="Silahkan masukan alamat lengkap anda")
        .row
            .col-md-6
                el-form-item(prop="province_id" label="Provinsi")
                  SearchProvinceField(v-model="form.province_id")
            .col-md-6
                el-form-item(prop="city_id" label="Kabupaten/Kota")
                  SearchCityField(v-model="form.city_id" :province-id="form.province_id")
        .row
            .col-md-6
                el-form-item(prop="district_id" label="Kecamatan")
                  SearchDistrictField(v-model="form.district_id" :city-id="form.city_id")
            .col-md-6
                el-form-item(prop="village_id" label="Kelurahan")
                  SearchVillageField(v-model="form.village_id" :district-id="form.district_id")
        
        el-form-item(label="Logo")
            UploadImageField(v-model="form.logo" width="120px" height="120px" :previewImage="storeData ? storeData.logo : null")
        
        .mt-3.text-right
            el-button(type="primary" @click="submitForm()" v-loading.fullscreen.lock="response.isLoading") Simpan

</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, ref, watch } from '@nuxtjs/composition-api'
export default {
  props: {
    storeData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { form: response, postData } = handler()

    const form = reactive({
      name: null,
      address: null,
      latitude: '13784',
      longitude: '387242',
      province_id: null,
      city_id: null,
      district_id: null,
      village_id: null,
      logo: null,
    })

    const rules = reactive({
      name: [
        {
          required: true,
          message: 'Please input your fullname',
          trigger: 'change',
        },
      ],
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
      village_id: [
        {
          required: true,
          message: 'Please select your village',
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
          const url = !props.storeData
            ? '/user/merchant'
            : '/user/merchant/update'
          postData(url, fd)
        }
      })
    }

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          emit('change')
        }
      },
      { deep: true }
    )

    function setStoreData(value) {
      if (value) {
        form.name = value.name
        form.address = value.address
        form.province_id = value.province ? value.province.id : null
        form.city_id = value.city ? value.city.id : null
        form.district_id = value.district ? value.district.id : null
        form.village_id = value.village ? value.village.id : null
      }
    }

    watch(
      () => props.storeData,
      (value) => {
        setStoreData(value)
      },
      { deep: true }
    )

    onMounted(() => {
      setStoreData(props.storeData)
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
