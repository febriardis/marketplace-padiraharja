<template lang="pug">
    #header
      #header1
        .me-container.d-flex.justify-content-between
          .download
            a(href="#") Download Padiraharja App
          .menu
            ul.right-nav
              li 
                a(href="#") Tentang Aplikasi
              li
                a(href="#") Petunjuk Penggunaan
              li
                a(href="#") Kerjasama

      #header2
        .me-container.d-flex.align-items-center.justify-content-between
          router-link.mr-3(to="/")
            img(src="../../assets/images/logo/logo.png" width="110" height="auto")
          
          CategoryField.hide-on-mobile(v-model="state.category")
          SearchField.w-50.mr-3(v-model="state.search")
          
          .d-flex.align-items-center
            el-button(plain size="small" @click="state.isLoginDialog = true") Masuk
            el-button.hide-on-mobile(type="primary" size="small" @click="$router.push({ name: 'auth-register' })") Daftar
          
          LoginDialog(v-model="state.isLoginDialog")
</template>

<script>
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'

export default {
  components: {
    LoginDialog: () => import('@/components/auth/LoginDialog'),
  },
  props: {
    isAuth: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root }) {
    const { result, fetchData } = handler()
    const state = reactive({
      isLoginDialog: false,
      userData: null,
      search: '',
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.userData = value.response.data
        }
      },
      { deep: true }
    )

    function fetchProfile() {
      fetchData('/user')
    }

    function handleRouter(routerName) {
      if (routerName === 'logout') {
        root
          .$confirm('Are you sure want to logout?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          })
          .then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('vuex')
            window.location.reload()
            root.$message({
              type: 'success',
              message: 'Logout completed',
            })
          })
      } else {
        root.$router.push({ name: routerName })
      }
    }

    onMounted(() => {
      if (props.isAuth) {
        fetchProfile()
      }
    })

    return {
      state,
      handleRouter,
    }
  },
}
</script>

<style lang="scss">
#header {
  border-bottom: 1px solid #f3f4f5;
  position: sticky;
  z-index: 99;
  top: 0;
}

#header1 {
  background-color: #f3f4f5;
  padding: 10px 0;
  .right-nav {
    margin: 0;
    li {
      list-style: none;
      display: inline;
      margin: 0 10px;
    }
  }
}

#header2 {
  background-color: #ffffff;
  padding: 10px 0;
}
</style>
