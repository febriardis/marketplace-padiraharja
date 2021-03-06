<template lang="pug">
  .homepage
    .hide-on-mobile
      ProfileViewer

    .show-on-mobile
      el-tabs.mt-2(v-model="activeName")
          el-tab-pane(label="Profil Saya" name="first")
              //- ProfileViewer
          el-tab-pane(label="Daftar Alamat" name="seconds")
              //- AddressViewer
              
      //- bottom navigation
      BottomNavigation
                
</template>

<script>
export default {
  middleware: 'authenticated',
  components: {
    // ProfileViewer: () => import('@/components/profile/Profile'),
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
  },
  data: () => ({
    activeName: 'first',
  }),
  head: () => ({
    title: 'Account Setting - Padiraharja',
  }),
}
</script>
