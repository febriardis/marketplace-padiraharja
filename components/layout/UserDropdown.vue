<template lang="pug">
    .user-dropdown.d-flex
        el-dropdown(trigger="click", @command="handleCommandUser")
            a.el-dropdown-link(href="javascript:void(0)")
                .d-flex.align-items-center
                    .show-in-phone
                      .user-circle
                        i.el-icon-user
                    span.hide-on-mobile.text-capitalize.ml-2 {{userData ? userData.name : ''}} 
                    i.el-icon-arrow-down.el-icon--right

            el-dropdown-menu(slot='dropdown')
                .main-user-dropdown.pb-3.px-3.pt-2(v-if="userData")
                    el-card(shadow="always", :body-style="{ padding: '10px' }")
                        .d-flex.align-items-center.justify-content-between
                            .main-user-profile-left.d-flex.align-items-center
                                p.m-0.ml-3 {{userData.name}}
                            .main-user-profile-right
                                .d-flex
                                    el-dropdown-item(command="store")
                                        | Toko
                                    el-dropdown-item(command="account")
                                        | Profil

                    .main-user-menu.pt-3
                        .main-user-menu-left
                            el-dropdown-item(command="withdraw")
                                | Saldo
                                span.font-weight-bold.i-text-normal-size
                                    | Rp. {{userData ? userData.balance : 0 | price}}

                        .main-user-menu-right
                            el-dropdown-item(command="banks")
                                | Akun Bank
                            el-dropdown-item(command="transactions")
                                | Riwayat Transaksi
                            el-dropdown-item.mt-3(command="logout", icon="el-icon-switch-button")
                                | Logout
</template>

<script>
export default {
  computed: {
    userData: (vm) => vm.$store.getters['auth/getSessionData'],
  },
  methods: {
    handleCommandUser(command) {
      if (command === 'logout') {
        this.logout()
      } else if (
        command === 'banks' ||
        command === 'transactions' ||
        command === 'withdraw'
      ) {
        this.$router.push({ name: 'account', query: { select: command } })
      } else if (command !== 'AccountSaldo') {
        this.$router.push({ name: command })
      }
    },
    logout() {
      this.$confirm('Are you sure want to logout?', 'Logout').then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('vuex')
        window.location.reload()
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
.user-circle {
  font-size: 14px;
  padding: 8px 9px;
  border-radius: 100%;
  border: 1px solid #acacac;
}
</style>
