<template lang="pug">
    .register-form.containers
        .row.justify-content-md-center
            .col-md-8.col-lg-5
                .register-card.mt-4
                    h3.mb-0 Silahkan Buat Akun
                    p.text-color-gray.mt-2.mb-2 Nikmati berbelanja produk UMKM dengan mudah dari rumah 
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
                        .row
                            .col-md-6
                              el-form-item(prop="password" label="Kata Sandi")
                                  el-input(type="password" v-model="form.password" placeholder="Mohon isi password")
                            .col-md-6
                              el-form-item(prop="password_confirmation" label="Konfirmasi Kata Sandi")
                                  el-input(type="password" v-model="form.password_confirmation" placeholder="Mohon isi password")
                        
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
                        
                        el-button.mt-3.w-100(
                            type="primary"
                            :loading="state.isLoading"
                            @click="submitForm()")
                            | Daftar
                        
                        .mt-4.border-top.text-center
                          p.text-center.text-size-small.text-color-gray
                              | Sudah punya akun?&nbsp;
                              a.red-link(href="javascript:void(0)" @click="$router.push({ name: 'auth-login' })") Masuk
      
        
</template>

<script>
import { reactive, ref } from '@nuxtjs/composition-api'
export default {
  middleware: 'login',
  setup(_, ctx) {
    const state = reactive({
      isLoading: false,
    })

    const form = reactive({
      name: null,
      phone: null,
      email: null,
      password: null,
      password_confirmation: null,
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
      password: [
        {
          required: true,
          message: 'Please input your password',
          trigger: 'change',
        },
      ],
      password_confirmation: [
        {
          required: true,
          message: 'Please input your password confirmation',
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
      const _this = ctx.root
      refForm.value.validate(async (valid) => {
        if (valid) {
          state.isLoading = true
          const response = await _this.$api.postData('/auth/register', form)
          if (response.status === 200) {
            _this.$router.push({ name: 'auth-login' })
          }
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
    }
  },
  head: () => ({
    title: 'Register - Padiraharja',
  }),
}
</script>

<style lang="scss">
.register-card {
  border: 1px solid #e0e0e0;
  border-radius: 3px !important;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 24px 40px 32px;
}
</style>
