<template lang="pug">
    .register-form.containers
        .row.justify-content-md-center
            .col-md-5
                .register-card.mt-4
                    LoginForm.mt-2
          
</template>

<script>
export default {
  middleware: 'login',
  components: {
    LoginForm: () => import('@/components/auth/LoginForm'),
  },
  head: () => ({
    title: 'Login - Pride n Joy',
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
