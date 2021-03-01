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
                              el-form-item(prop="name" label="Nomor Telepon")
                                  el-input(type="text" v-model="form.name" placeholder="Silahkan masukan nama lengkap anda")
                            .col-md-6
                              el-form-item(prop="email" label="Email")
                                  el-input(type="email" v-model="form.email" placeholder="Silahkan masukan Email")
                        .row
                            .col-md-6
                              el-form-item(prop="password" label="Kata Sandi")
                                  el-input(type="password" v-model="form.password" placeholder="Mohon isi password")
                            .col-md-6
                              el-form-item(prop="password" label="Konfirmasi Kata Sandi")
                                  el-input(type="password" v-model="form.password" placeholder="Mohon isi password")
                        
                        el-form-item(prop="name" label="Alamat")
                            el-input(type="textarea" v-model="form.name" placeholder="Silahkan masukan nama lengkap anda")
                    
                        .row
                            .col-md-6
                              el-form-item(prop="cityId" label="Provinsi")
                                f-search-location(v-model="form.cityId" @input="fetchSubdistrict()")
                            .col-md-6
                              el-form-item(prop="subdistrictId" label="Kota/Kabupaten")
                                el-select.w-100(v-model="form.subdistrictId" filterable default-first-option)
                                  el-option(
                                    v-for="item in state.subdistricts"
                                    :key="item.subdistrict_id"
                                    :label="item.subdistrict_name"
                                    :value="item.subdistrict_id")
                        .row
                            .col-md-6
                              el-form-item(prop="cityId" label="Kecamatan")
                                f-search-location(v-model="form.cityId" @input="fetchSubdistrict()")
                            .col-md-6
                              el-form-item(prop="subdistrictId" label="Kelurahan")
                                el-select.w-100(v-model="form.subdistrictId" filterable default-first-option)
                                  el-option(
                                    v-for="item in state.subdistricts"
                                    :key="item.subdistrict_id"
                                    :label="item.subdistrict_name"
                                    :value="item.subdistrict_id")
                        
                        el-button.mt-3.w-100(
                            type="unique"
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
      name: '',
      email: '',
      password: '',
    })

    const rules = reactive({
      name: [
        {
          required: true,
          message: 'Please input your password',
          trigger: 'blur',
        },
      ],
      email: [
        {
          required: true,
          message: 'Please input your email',
          trigger: 'blur',
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
          trigger: 'blur',
        },
      ],
    })

    const refForm = ref(null)

    function submitForm() {
      const _this = ctx.root
      refForm.value.validate((valid) => {
        if (valid) {
          state.isLoading = true
          _this.$axios
            .post('https://api.pridenjoyco.id/signup', form)
            .then((resp) => {
              if (resp.status === 200 || resp.status === 201) {
                _this.$router.push({ name: 'auth-login' })
              }
              state.isLoading = false
            })
            .catch((err) => {
              _this.$message({
                type: 'warning',
                message: err.response.data.messages,
              })
              state.isLoading = false
            })
        }
      })
    }

    function fetchSubdistrict() {
      // fetchData('/addresses/subdistricts', {
      //   city_id: form.cityId,
      // })
    }

    return {
      state,
      form,
      rules,
      refForm,
      submitForm,
      fetchSubdistrict,
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
