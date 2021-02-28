<template lang="pug">
    .containers
        el-tabs.mt-2(v-model="activeName")
            el-tab-pane(label="Profil Saya" name="first")
                ProfileViewer
            el-tab-pane(label="Daftar Alamat" name="seconds")
                AddressViewer
                
</template>

<script>
export default {
  // layout: 'auth',
  middleware: 'authenticated',
  components: {
    ProfileViewer: () => import('@/components/account/Profile'),
    AddressViewer: () => import('@/components/account/Address'),
  },
  data: () => ({
    activeName: 'first',
  }),
  head: () => ({
    title: 'Accont Setting - Pride n Joy',
  }),
}
</script>
