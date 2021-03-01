<template lang="pug">
    .user-dropdown.d-flex
        el-dropdown(trigger="click", @command="handleCommandUser")
            .el-dropdown-link
                .d-flex.align-items-center
                    .show-in-phone.border.p-2(style="border-radius:100%")
                        i.el-icon-user
                    span.hide-on-mobile.text-capitalize.ml-2 Febri Ardi... 
                    i.el-icon-arrow-down.el-icon--right

            el-dropdown-menu(slot='dropdown')
                .main-user-dropdown.pb-3.px-3.pt-2
                    el-card(shadow="always", :body-style="{ padding: '10px' }")
                        .d-flex.align-items-center.justify-content-between
                            .main-user-profile-left.d-flex.align-items-center
                                p.m-0 Febri Ardi Saputra
                            .main-user-profile-right
                                .d-flex
                                    el-dropdown-item(command="AccountProfile")
                                        | Toko
                                    el-dropdown-item(command="AccountProfile")
                                        | Profil

                    .main-user-menu.pt-3
                        .main-user-menu-left
                            el-dropdown-item(command="AccountSaldo")
                                | Saldo
                                span.font-weight-bold.i-text-normal-size
                                    | Rp. 100.000

                        .main-user-menu-right
                            el-dropdown-item(command="AccountTransaction")
                                | Riwayat Transaksi
                            el-dropdown-item(command="AccountOrder")
                                | Tambah Bank
                            el-dropdown-item(command="AccountSetting")
                                | Setting
                            el-dropdown-item.mt-3(command="logout", icon="el-icon-switch-button")
                                | Logout
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  computed: {
    // ...mapGetters(['isAuthenticated', 'profile']),
  },
  methods: {
    handleCommandUser(command) {
      if (command === 'logout') {
        this.logout()
        return
      }
      if (command === 'Voucher') {
        this.notification('Coming soon', 'info')
        return
      }
      this.$router.push({
        name: command,
      })
    },
    logout() {
      this.$confirm('Are you sure want to logout?', 'Logout')
        .then(() => {
          this.$store.dispatch('AUTH_LOGOUT').then(() => {
            this.$socket.disconnect()
            this.$router
              .push({
                name: 'landing',
              })
              .catch((err) => {
                console.log(err)
              })
            setTimeout(() => {
              window.location.reload()
            }, 300)
          })
        })
        .catch(() => {
          console.log('cancel logout')
        })
    },
  },
}
</script>

<style lang="scss">
.main-user-menu {
  display: flex;

  &-left {
    width: 50%;
    display: inline-block;
    padding-right: 0.5em;
    border-right: solid 1px #bcbcbc;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }
  }

  &-right {
    width: 50%;
    display: inline-block;
    padding-left: 0.5em;
  }
}
</style>
