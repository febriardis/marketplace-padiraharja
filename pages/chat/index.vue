<template lang="pug">
    .homepage
        .row.mt-4
            .col-md-3
                .border.rounded-lg.shadow-sm
                    .border-bottom.pr-3.pl-3
                      h3 Pesan {{showMessage}}
                    .p-3.pt-1
                      el-tabs(v-model="tabName")
                          //- Official Store for user (sebagai pembeli)
                          el-tab-pane(label="Toko Resmi" name="user")
                              ChatList(:chats="chats" @change="selectChat($event)")
                          //- Customer for merchant (sebagai penjual)
                          el-tab-pane(label="Pelanggan" name="merchant")
                              ChatList(:chats="chats" @change="selectChat($event)")
                    

            .col-md-9.hide-on-mobile
                ChatContent(
                  v-if="showMessage"
                  :initialTo="initialTo"
                  :name="chatSelected.name"
                  :userId="chatSelected.user_id"
                  :merchantId="chatSelected.merchant_id")
                .no-message.d-flex.align-items-center.justify-content-center.h-100(v-else)
                  | No message selected
        
        transition(name="fade")
          .chat-widget-mobile.shadow-lg.show-on-mobile(v-if="showMessage")
            ChatContent(
              close 
              :initialTo="initialTo"
              :name="chatSelected.name"
              :userId="chatSelected.user_id"
              :merchantId="chatSelected.merchant_id"
              @change="showMessage = $event")
</template>

<script>
export default {
  middleware: 'authenticated',
  components: {
    ChatList: () => import('@/components/chat/ChatList'),
    ChatContent: () => import('@/components/chat/ChatContent'),
  },

  data: () => ({
    chats: [],
    tabName: 'user',
    initialTo: 'MERCHANT',
    showMessage: false,
    chatSelected: null,
  }),

  watch: {
    tabName(value) {
      this.fetchChats(value)
      this.showMessage = false
      this.initialTo = value === 'user' ? 'MERCHANT' : 'USER'
    },
    // chatSelected(value) {
    //   console.log('chatSelected', value)
    //   if (value) {
    //     this.showMessage = true
    //   }
    // },
  },

  mounted() {
    this.fetchChats('user')
  },

  methods: {
    selectChat(event) {
      this.chatSelected = event
      this.showMessage = true
    },
    async fetchChats(type) {
      const response = await this.$api.fetchData(`/chat/${type}`)
      if (response.status === 200) {
        this.chats = response.data.data
      }
    },
  },

  head: () => ({
    title: 'Chat - Padiraharja',
  }),
}
</script>

<style lang="scss">
.chat-widget-mobile {
  z-index: 99;
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
