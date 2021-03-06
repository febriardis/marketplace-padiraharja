<template lang="pug">
    .register-form.containers
        .row.justify-content-md-center
            .col-md-8.col-lg-5
                .register-card.mt-4
                    .mt-2.login-form.text-size-small
                      h3 Ubah Password
                      p.text-color-gray.mt-2.mb-2 Silahkan masukan email anda untuk malanjutkan reset password.
                      el-form(
                          :model="form"
                          :rules="rules"
                          ref="refForm"
                      )
                          el-form-item(prop="email" label="Email")
                              el-input(type="email" v-model="form.email" placeholder="Email")
                          el-button.mt-3.w-100(
                              type="primary"
                              :loading="state.isLoading"
                              @click="submitForm()")
                              | Reset Password 
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
      email: '', // 'user@pnj.id',
      password: '', // 'useruser',
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
      refForm.value.validate((valid) => {
        if (valid) {
          state.isLoading = true
          _this.$axios
            .post('http://api.emsacode.xyz/signin', form)
            .then((resp) => {
              if (resp.status === 200) {
                const data = resp.data.data
                localStorage.setItem('token', data.accessToken)
                window.location.reload()
              }
              state.isLoading = false
            })
            .catch((err) => {
              state.isLoading = false
              _this.$message({
                type: 'warning',
                message: err.response
                  ? err.response.data.messages
                  : 'Invalid password',
              })
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
