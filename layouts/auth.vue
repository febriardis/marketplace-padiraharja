<template lang="pug">
  .default
    Header(is-auth)
    el-container.full-height
      nuxt
    .footer.text-center.mt-5.text-color-gray
      | &copy; Copyright Pride n Joy Fast Pants 2020. All Rights Reserved
</template>

<style lang="scss">
@import '@/assets/styles/custom-ui/custom';
@import '@/assets/styles/element-ui/custom';
.footer {
  border-bottom: 1px solid #dee2e6;
  box-shadow: rgba(49, 53, 59, 0.12) 0px 1px 6px 0px;
  background: #eeeeef;
  font-size: 14px;
  padding: 20px;
  // bottom: 0;
  // position: absolute;
}
.full-height {
  height: 100%;
}
</style>
