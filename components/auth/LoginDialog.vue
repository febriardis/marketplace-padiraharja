<template lang="pug">
    el-dialog(
        :visible.sync="isLoginDialog"
        width="350px")
        .content-dialog.mt-3
          LoginForm(:is-dialog.sync="isLoginDialog")
</template>

<script>
export default {
  components: {
    LoginForm: () => import('@/components/auth/LoginForm'),
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isLoginDialog: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>
