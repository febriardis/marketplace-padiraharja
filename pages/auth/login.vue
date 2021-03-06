<template lang="pug">
    .register-form.containers
        .row.justify-content-md-center
            .col-md-8.col-lg-5
                .register-card.mt-4
                    .mt-2.login-form.text-size-small
                      h3 Selamat Datang !
                      p.text-color-gray.mt-2.mb-2 Silahkan Login Untuk Melanjutkan
                      el-form(
                          :model="form"
                          :rules="rules"
                          ref="refForm"
                      )
                          el-form-item(prop="email" label="Email")
                              el-input(type="email" v-model="form.email" placeholder="Email")
                          el-form-item(prop="password" label="Kata Sandi")
                              el-input(type="password" v-model="form.password" placeholder="Kata Sandi")
                          
                          .mt-3
                              a.red-link(href="javasciprt:void(0)" @click="isLoginDialog = false, $router.push({ name: 'auth-reset-password' })") Lupa Password?

                          el-button.mt-3.w-100(
                              type="primary"
                              :loading="state.isLoading"
                              @click="submitForm()")
                              | LOGIN

                          .mt-4.border-top.text-center
                              p.text-size-small.mb-0
                                  | Belum punya akun Padiraharja? &nbsp;
                                  a.red-link(href="javasciprt:void(0)" @click="isLoginDialog = false, $router.push({ name: 'auth-register' })") Daftar
          
</template>

<script>
import { computed, reactive, ref } from '@nuxtjs/composition-api'
export default {
  middleware: 'login',
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      isLoading: false,
    })

    const form = reactive({
      email: 'rifardian@gmail.com',
      password: '123456',
    })

    const rules = reactive({
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

    const isLoginDialog = computed({
      get: () => {
        return props.isDialog
      },
      set: (val) => {
        ctx.emit('update:isDialog', val)
      },
    })

    function submitForm() {
      const _this = ctx.root
      refForm.value.validate(async (valid) => {
        if (valid) {
          state.isLoading = true
          const response = await _this.$api.postData('/auth/login', form)
          if (response.status === 200) {
            const data = response.data.data
            localStorage.setItem('token', data.token)
            window.location.reload()
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
      isLoginDialog,
    }
  },
  head: () => ({
    title: 'Login - Padiraharja',
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
