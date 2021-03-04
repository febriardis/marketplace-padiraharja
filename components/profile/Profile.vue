<template lang="pug">
    .homepage
        .row.mt-4
            .col-md-6
                h4.mt-2.mb-2 Profil Saya
                p.mt-0.text-size-small.text-color-gray Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun
                el-form(
                    :model="form"
                    :rules="rules"
                    ref="refForm"
                  )
                    el-form-item(prop="name" label="Nama")
                        el-input(type="text" v-model="form.name" placeholder="Silahkan masukan nama lengkap anda")
                    .row
                        .col-md-6
                          el-form-item(prop="phone" label="Nomor Telepon")
                              el-input(type="text" v-model="form.phone" placeholder="Silahkan masukan nama lengkap anda")
                        .col-md-6
                          el-form-item(prop="email" label="Email")
                              el-input(type="email" v-model="form.email" placeholder="Silahkan masukan Email")
                    
                    el-form-item(prop="address" label="Alamat")
                        el-input(type="textarea" v-model="form.address" placeholder="Silahkan masukan alamat lengkap anda")
                
                    .row
                        .col-md-6
                          el-form-item(prop="province_id" label="Provinsi")
                            SearchProvinceField(v-model="form.province_id")
                        .col-md-6
                          el-form-item(prop="city_id" label="Kota/Kabupaten")
                            SearchCityField(v-model="form.city_id" :province-id="form.province_id")
                    .row
                        .col-md-6
                          el-form-item(prop="district_id" label="Kecamatan")
                            SearchDistrictField(v-model="form.district_id" :city-id="form.city_id")
                        .col-md-6
                          el-form-item(prop="village_id" label="Kelurahan")
                            SearchVillageField(v-model="form.village_id" :district-id="form.district_id")
                    .mt-3.text-right
                      el-button(type='unique' @click="submitForm()" v-loading.fullscreen.lock="response.isLoading") Simpan

</template>

<script>
import { handler } from '@/controllers/handler'
import { computed, onMounted, reactive, ref } from '@nuxtjs/composition-api'
export default {
  setup() {
    const { form: response, putData } = handler()

    const form = reactive({
      name: null,
      phone: null,
      email: null,
      address: null,
      province_id: null,
      city_id: null,
      district_id: null,
      village_id: null,
    })

    const rules = reactive({
      name: [
        {
          required: true,
          message: 'Please input your fullname',
          trigger: 'change',
        },
      ],
      phone: [
        {
          required: true,
          message: 'Please input your phone number',
          trigger: 'change',
        },
      ],
      email: [
        {
          required: true,
          message: 'Please input your email',
          trigger: 'change',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
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
          putData(`/user`, form)
        }
      })
    }

    onMounted(() => {
      const user = userData.value
      console.log('userData', user)
      if (user) {
        form.name = user.name
        form.phone = user.phone
        form.email = user.email
        form.address = user.address
        form.province_id = user.province.id
        form.city_id = user.city.id
        form.district_id = user.district.id
        form.village_id = user.village.id
      }
    })

    const userData = computed((vm) => vm.$store.getters['auth/getSessionData'])

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
