<template lang="pug">
  .homepage
    .show-on-mobile
        el-tabs.mt-2(v-model="tab_name")
            el-tab-pane(label="Akun Pembeli" name="1")
                .side-content
                    .store-detail.border-top.border-bottom.pb-3.pt-3
                        .d-flex.align-items-center.justify-content-between(v-if="user_data")
                            .user-info
                                p.font-weight-bold.m-0 {{user_data.name}}
                                p.text-color-gray.m-0.mt-1 {{user_data.phone}}
                                p.text-color-gray.m-0.mt-1 {{user_data.email}}
                            .user-detail
                                p.font-weight-light.m-0 Saldo: Rp.{{user_data.balance | price}}
                    el-menu.el-menu-vertical-demo.border-0(default-active="1")
                        el-menu-item(@click="onSidebarClicked" v-for="(item, key) in userMenus" :key="key" :index="item.id")
                            i.fas(:class="item.icon" :style="{marginRight: item.mr}")
                            span(slot='title') {{item.label}}
                        el-menu-item(index="6" @click="onSidebarClicked")
                            .d-flex.align-items-center.justify-content-between.text-price(slot='title')
                                span Hubungi Admin
                                i.far.fa-comment-dots
                        el-menu-item(index="7" @click="onSidebarClicked")
                            .d-flex.align-items-center.justify-content-between.text-price(slot='title')
                                span Logout
                                i.far.fa-power-off
                            
            el-tab-pane(label="Akun Toko" name="2")
                .side-content
                    .store-detail.border-top.border-bottom.pb-3.pt-3
                        .d-flex.align-items-center(v-if="store_data")
                            .product-image.mr-3
                                img(:src="store_data.logo" width="40" height="40")
                            .product-detail
                                p.font-weight-bold.m-0 {{store_data.name}}
                    el-menu.el-menu-vertical-demo(default-active="1")
                        el-menu-item(@click="onSidebarClicked" v-for="(item, key) in merchantMenus" :key="key" :index="item.id")
                            i.fas(:class="item.icon" :style="{marginRight: item.mr}")
                            span(slot='title') {{item.label}}
              
        //- bottom navigation
        BottomNavigation
</template>

<script>
export default {
  middleware: 'authenticated',
  components: {
    BottomNavigation: () => import('@/components/layout/BottomNavigation'),
  },

  data: () => ({
    store_data: null,
    tab_name: '1',
    userMenus: [
      { id: 1, icon: 'fa-user', label: 'Profile', mr: '18px' },
      { id: 2, icon: 'fa-hand-holding-usd', label: 'Tarik Saldo', mr: '16px' },
      { id: 3, icon: 'fa-credit-card', label: 'Akun Bank', mr: '18px' },
      { id: 4, icon: 'fa-history', label: 'Riwayat Transaksi', mr: '18px' },
      { id: 5, icon: 'fa-file', label: 'Kebijakan Privasi', mr: '23px' },
    ],
    merchantMenus: [
      { id: 1, icon: 'fa-store', label: 'Toko', mr: '13px' },
      { id: 2, icon: 'fa-list', label: 'Produk', mr: '16px' },
      { id: 3, icon: 'fa-map-pin', label: 'Alamat Pengiriman', mr: '22px' },
      { id: 4, icon: 'fa-history', label: 'Riwayat Transaksi', mr: '15px' },
    ],
  }),

  computed: {
    user_data() {
      return this.$store.getters['auth/getSessionData']
    },
  },

  mounted() {
    this.fetchStore()
  },
  methods: {
    onSidebarClicked(key) {
      this.sidebar_type = key.index
    },

    async fetchStore() {
      const response = await this.$api.fetchData('/user/merchant')
      if (response.status === 200) {
        this.store_data = response.data.data
      }
    },
  },

  head: () => ({
    title: 'Profile Setting - Padiraharja',
  }),
}
</script>

<style lang="scss">
.store-detail {
  padding: 0 20px;
}
</style>
