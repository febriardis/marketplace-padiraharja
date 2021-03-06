<template lang="pug">
    #header
      #header1
        .me-container.d-flex.justify-content-between
          .download
            a(href="#") Download Padiraharja App
          .menu
            ul.right-nav
              li.hide-on-mobile 
                a(href="javascript:void(0)" @click="$router.push({name: 'news'})") Berita Harian
              li
                a(href="#") Hubungi Admin
              li.hide-on-mobile
                a(href="#") Kebijakan Privasi

      #header2
        .me-container.d-flex.align-items-center.justify-content-between
          router-link.mr-3.hide-on-mobile(to="/")
            img(src="../../assets/images/logo/logo.png" width="110" height="auto")
          SearchField.mr-3
          
          //- if loggedin
          .d-flex.align-items-center(v-if="isAuth")
            el-badge.mr-3.hide-on-mobile(:value="12" class="item") 
              el-button(icon="el-icon-shopping-cart-2" @click="$router.push({name: 'cart'})" size="small") 
            el-badge(:value="12" class="item") 
              el-button(icon="el-icon-chat-square" size="small") 
            .border-left.pl-4.ml-4.hide-on-mobile
              UserDropdown

          //- else
          .d-flex.align-items-center(v-else)
            el-button(plain size="small" @click="$router.push({ name: 'auth-login' })") Masuk
            el-button.hide-on-mobile(type="primary" size="small" @click="$router.push({ name: 'auth-register' })") Daftar

</template>

<script>
import { onMounted, reactive, watch } from '@nuxtjs/composition-api'
import { handler } from '@/controllers/handler'

export default {
  components: {
    UserDropdown: () => import('./UserDropdown'),
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
      search: '',
    })

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          root.$store.commit('auth/SET_SESSION', value.response.data)
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
  #header1 {
    background-color: #f3f4f5;
    padding: 10px 0;
    .right-nav {
      margin: 0;
      li {
        list-style: none;
        // display: inline;
        float: left;
        margin: 0 10px;
      }
    }
  }
  #header2 {
    background-color: #ffffff;
    padding: 10px 0;
  }
}

.main-user-dropdown {
  width: 450px;
}
</style>
