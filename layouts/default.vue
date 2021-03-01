<template lang="pug">
  .default
    Header(:isAuth="isLoggedIn")
    .me-container.full-page
      nuxt
    .footer.text-center.mt-5.text-color-gray
      | &copy; Copyright Padiraharja 2020. All Rights Reserved
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      const token = !!localStorage.getItem('token')
      return token
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/custom-ui/custom';
@import '@/assets/styles/element-ui/custom';
.footer {
  border-bottom: 1px solid #dee2e6;
  box-shadow: rgba(49, 53, 59, 0.12) 0px 1px 6px 0px;
  background: #eeeeef;
  font-size: 14px;
  padding: 20px;
}

.full-page {
  min-height: calc(100vh - 150px);
}
</style>
