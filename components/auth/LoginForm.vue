<template lang="pug">
    .login-form.text-size-small
        .d-flex.justify-content-between
            h2.mt-0(v-if="isLoginDialog") Login
            h3.mt-0(v-else) Login
            a.mt-1(href="javasciprt:void(0)" @click="isLoginDialog = false, $router.push({ name: 'auth-register' })") Daftar
        el-form(
            :model="form"
            :rules="rules"
            ref="refForm"
        )
            el-form-item(prop="email" label="Email")
                el-input(type="email" v-model="form.email" placeholder="Silahkan masukan Email")
            el-form-item(prop="password" label="Password")
                el-input(type="password" v-model="form.password" placeholder="Mohon isi password")
            
            //- .mt-3
                a(href="#") Lupa Password

            el-button.mt-3.w-100(
                type="primary"
                :loading="state.isLoading"
                @click="submitForm()")
                | LOGIN

            .mt-4.border-top.text-center
                p.text-size-small.mb-0
                    | Belum punya akun pride n joy? &nbsp;
                    a(href="javasciprt:void(0)" @click="isLoginDialog = false, $router.push({ name: 'auth-register' })") Daftar
</template>

<script>
import { computed, reactive, ref } from '@nuxtjs/composition-api'
export default {
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
            .post('https://api.pridenjoyco.id/signin', form)
            .then((resp) => {
              if (resp.status === 200) {
                const data = resp.data.data
                localStorage.setItem('token', data.accessToken)
                _this.$store.commit('auth/SET_SESSION', data.user)
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
}
</script>
