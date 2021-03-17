<template lang="pug">
  .homepage
    .hide-on-mobile
      .row.mt-4
        .col-md-3
          .side-content.position-sticky(style="top:120px")
            .store-detail.border-top.border-bottom.border-right.pb-4.pt-4
              .d-flex.align-items-center.justify-content-between(v-if="user_data")
                .user-info
                  p.font-weight-bold.m-0 {{user_data.name}}
                .user-detail
                  p.font-weight-light.m-0 Saldo: Rp.{{user_data.balance | price}}
            el-menu.el-menu-vertical-demo(:default-active="default_active_side")
              el-menu-item(index="1" @click="onSidebarClicked")
                i.fas.fa-user(style="margin-right:18px")
                span(slot='title') Profil
              el-menu-item(index="2" @click="onSidebarClicked")
                i.fas.fa-hand-holding-usd(style="margin-right:16px")
                span(slot='title') Tarik Saldo
              el-menu-item(index="3" @click="onSidebarClicked")
                i.fas.fa-credit-card(style="margin-right:16px")
                span(slot='title') Akun Bank
              el-menu-item(index="4" @click="onSidebarClicked")
                i.fas.fa-history(style="margin-right:15px")
                span(slot='title') Riwayat Transaksi

        .col-md-9
          FormAccount(:userData="user_data" v-if="sidebar_type === '1'")
          WithdrawList(v-else-if="sidebar_type === '2'")
          BanksList(v-else-if="sidebar_type === '3'")
          TransactionsList(v-else-if="sidebar_type === '4'")
                
</template>

<script>
export default {
  middleware: 'authenticated',
  components: {
    FormAccount: () => import('@/components/account/FormAccount'),
    WithdrawList: () => import('@/components/account/WithdrawList'),
    BanksList: () => import('@/components/account/BanksList'),
    TransactionsList: () => import('@/components/account/TransactionsListUser'),
  },

  data: () => ({
    tab_name: '1',
    sidebar_type: '1',
    default_active_side: '1',
  }),

  computed: {
    user_data() {
      return this.$store.getters['auth/getSessionData']
    },
    query() {
      return this.$route.query.select
    },
  },

  watch: {
    query(value) {
      this.changeNavigation(value)
    },
  },

  mounted() {
    this.changeNavigation(this.query)
  },

  methods: {
    changeNavigation(query) {
      if (query === 'banks') {
        this.sidebar_type = '3'
        this.default_active_side = '3'
      } else if (query === 'transactions') {
        this.sidebar_type = '4'
        this.default_active_side = '4'
      } else if (query === 'withdraw') {
        this.sidebar_type = '2'
        this.default_active_side = '2'
      }
    },
    onSidebarClicked(key) {
      this.sidebar_type = key.index
    },
  },

  head: () => ({
    title: 'Account Setting - Padiraharja',
  }),
}
</script>

<style lang="scss">
.store-detail {
  padding: 0 20px;
}
</style>
