<template lang="pug">
    .chat-content.border.rounded-lg.shadow-sm.bg-white
        .border-bottom.pr-3.pl-3
          .d-flex.align-items-center.justify-content-between
            h4 {{name}}
            .close(v-if="close")
              el-button(@click="$emit('change', false)" size="small")
                | X
        .wrapperChat(id="boxWrapper")
            div(v-for="(chat, key) in chats" :key="key" :class="{ 'direction-right': chat.user_id === userId }" )
                p.text-size-mini.text-center.text-color-gray.direction-left(v-if="isShowDate(chat.created_at, key)")
                    | {{ chat.created_at | formatDate("DD MMMM YYYY") }}
                
                .chatBGroup(:class="chat.user_id === userId ? 'chatBSelf' : 'chatBPartner'")
                    .text-size-small.direction-left(v-html="chat.message")
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
// import moment from 'moment'
import { handler } from '@/controllers/handler'
import { onMounted, reactive, toRefs, watch } from '@nuxtjs/composition-api'

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
    const { form: response, postData, result, fetchData } = handler()

    const state = reactive({
      chat_value: null,
      chats: [
        // {
        //   type: 2,
        //   message:
        //     'Hello, is this product are compitable with my sensitive skin? i really hope you would respond my chat, thanks.',
        //   created_at: 1614050152,
        // },
        // {
        //   type: 1,
        //   message:
        //     'Hi <b>dear</b>, our products are natural based so it would not damage your sensitive skin.',
        //   created_at: 1614050152,
        // },
      ],
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

    watch(
      () => result,
      (value) => {
        if (value.isSuccess) {
          state.chats = value.response.data
        } else {
          state.chats = []
        }
      },
      { deep: true }
    )

    function fetchMessage() {
      fetchData('/chat/message', {
        user_id: props.userId,
        merchant_id: props.merchantId,
      })
    }

    watch(
      () => props.name,
      () => {
        fetchMessage()
      }
    )

    onMounted(() => {
      fetchMessage()
    })

    return {
      ...toRefs(state),
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
  height: calc(100vh - 280px);
  background-color: #fdfdfd;
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
