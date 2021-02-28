<template lang="pug">
    .register-form.containers
        .row.justify-content-md-center
            .col-md-5
                .register-card.mt-4
                    h3.m-2.text-center
                        | Daftar Sekarang
                    p.text-center.text-size-small.text-color-gray
                        | Sudah punya akun?&nbsp;
                        a(href="javascript:void(0)" @click="$router.push({ name: 'auth-login' })") Masuk
                    el-form(
                        :model="form"
                        :rules="rules"
                        ref="refForm"
                    )
                        el-form-item(prop="name" label="Nama")
                            el-input(type="email" v-model="form.name" placeholder="Silahkan masukan nama lengkap anda")
                        el-form-item(prop="email" label="Email")
                            el-input(type="email" v-model="form.email" placeholder="Silahkan masukan Email")
                        el-form-item(prop="password" label="Password")
                            el-input(type="password" v-model="form.password" placeholder="Mohon isi password")
                    
                        el-button.mt-3.w-100(
                            type="primary"
                            :loading="state.isLoading"
                            @click="submitForm()")
                            | Daftar

                        .mt-4.border-top.text-center
                            p.text-size-mini.text-color-gray.mb-0
                                | Dengan mendaftar, saya menyetujui 
                                a(href="#")
                                    | Syarat dan Ketentuan 
                                | serta 
                                a(href="#")
                                    | Kebijakan Privasi
        
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

    return {
      state,
      form,
      rules,
      refForm,
      submitForm,
    }
  },
  head: () => ({
    title: 'Register - Pride n Joy',
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
