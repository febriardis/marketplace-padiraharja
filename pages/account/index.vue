<template lang="pug">
    .homepage
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
  // layout: 'auth',
  // middleware: 'authenticated',
  components: {
    // ProfileViewer: () => import('@/components/account/Profile'),
    // AddressViewer: () => import('@/components/account/Address'),
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
  },
  data: () => ({
    activeName: 'first',
  }),
  head: () => ({
    title: 'Accont Setting - Padiraharja',
  }),
}
</script>
