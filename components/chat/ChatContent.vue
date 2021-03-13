<template lang="pug">
    .chat-content.border.rounded-lg.shadow-sm.bg-white
        .border-bottom.pr-3.pl-3
          .d-flex.align-items-center.justify-content-between
            h4 {{name}}
            .close(v-if="close")
              el-button(@click="$emit('change', false)" size="small")
                i.fas.fa-times
        .wrapperChat(id="boxWrapper")
            .direction-right(v-for="(chat, key) in chats" :key="key" :class="{ 'direction-left': (initialTo === 'MERCHANT' && chat.recipient === 'USER' && chat.user_id === userData.id) || (initialTo === 'USER' && chat.recipient === 'MERCHANT' && chat.merchant_id === userMerchantId) }" )
                p.text-size-mini.text-center.text-color-gray(v-if="isShowDate(chat.created_at, key)")
                    | {{ chat.created_at | formatDate("DD MMMM YYYY") }}
                
                .chatBGroup(
                  :class="(initialTo === 'MERCHANT' && chat.recipient === 'USER' && chat.user_id === userData.id) || (initialTo === 'USER' && chat.recipient === 'MERCHANT' && chat.merchant_id === userMerchantId)  ? 'chatBPartner' : 'chatBSelf'")
                    .text-size-small(v-html="chat.message")
                    p.text-size-mini.mt-2.mb-0
                        | {{ chat.created_at | formatDate("HH:mm") }}

        .border-top.p-2
            form(@submit.prevent="postChat()")
                .d-flex
                    el-input.mr-3(v-model="chat_value" placeholder="Ketik pesan...")
                    el-button(type="submit" size="small")
                        i.fas.fa-paper-plane.text-size-medium
</template>

<script>
import { handler } from '@/controllers/handler'
import {
  computed,
  onMounted,
  reactive,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'

export default {
  props: {
    initialTo: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    userId: {
      type: Number,
      default: null,
    },
    merchantId: {
      type: Number,
      default: null,
    },
    close: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root }) {
    const { form: response, postData } = handler()

    const state = reactive({
      chats: [],
      chat_value: null,
      merchant_data: null,
    })

    function scrollToBottom() {
      const boxWrapper = document.querySelector('#boxWrapper')
      if (boxWrapper) {
        setTimeout(() => {
          boxWrapper.scrollTop = boxWrapper.scrollHeight
        }, 100)
      }
    }

    function isShowDate(createdAt, key) {
      return (
        key === 0 ||
        (key > 1 &&
          root.$filters.formatDate(createdAt, 'DD MMM YYYY') !==
            root.$filters.formatDate(
              state.chats[key - 1].created_at,
              'DD MMM YYYY'
            ))
      )
    }

    watch(
      () => response,
      (value) => {
        if (value.isSuccess) {
          console.log('postchat', value)
        }
      },
      { deep: true }
    )

    function postChat() {
      if (state.chat_value) {
        const params = {
          user_id: props.userId,
          merchant_id: props.merchantId,
          message: state.chat_value,
          to: props.initialTo,
        }
        state.chats.push(params)
        postData('/chat', params)
        state.chat_value = ''
        scrollToBottom()
      }
    }

    const fetchMessage = async () => {
      const response = await root.$api.fetchData('/chat/message', {
        user_id: props.userId,
        merchant_id: props.merchantId,
      })
      if (response.status === 200) {
        state.chats = response.data.data
        state.chats.reverse()
        scrollToBottom()
      } else {
        state.chats = []
      }
    }

    watch(
      () => props.name,
      () => {
        fetchMessage()
      }
    )

    onMounted(() => {
      fetchStore()
      fetchMessage()
    })

    const userData = computed((vm) => vm.$store.getters['auth/getSessionData'])
    const userMerchantId = computed(() =>
      state.merchant_data ? state.merchant_data.id : null
    )

    const fetchStore = async () => {
      const response = await root.$api.fetchData('/user/merchant')
      if (response.status === 200) {
        state.merchant_data = response.data.data
      }
    }

    return {
      ...toRefs(state),
      userData,
      userMerchantId,
      postChat,
      isShowDate,
      scrollToBottom,
    }
  },
}
</script>

<style lang="scss">
.wrapperChat {
  padding: 10px;
  overflow-y: scroll;
  // height: calc(100vh - 280px);
  height: calc(100vh - 140px);
  background-color: #fdfdfd;
}

@media (min-width: 769px) {
  .wrapperChat {
    height: calc(100vh - 280px);
  }
}

.chatBGroup {
  color: #5f5f5f;
  padding: 0.75rem;
  max-width: 20rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  display: inline-block;
  border-radius: 0.75rem;
}

.chatBSelf {
  background-color: #baf8d2;
  border-bottom-right-radius: 0px;
}

.chatBPartner {
  border: 1px solid #d6d6d6;
  background-color: #ffffff;
  border-bottom-left-radius: 0px;
}
</style>
