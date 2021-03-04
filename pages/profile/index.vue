<template lang="pug">
    .homepage
        ProfileViewer
                
</template>

<script>
export default {
  // layout: 'auth',
  middleware: 'authenticated',
  components: {
    ProfileViewer: () => import('@/components/profile/Profile'),
  },
  head: () => ({
    title: 'Profile Setting - Padiraharja',
  }),
}
</script>
