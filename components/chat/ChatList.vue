<template lang="pug">
    .chatList
      a.listItem(
        :class="{ 'active' : chatActive === key }"
        v-for="(item, key) in chats"
        @click="chatActive = key, $emit('change', item)"
        :key="key")
        .d-flex.align-items-center
            .chat-image.mr-2(v-if="item.logo")
              img.rounded-circle.mx-auto(:src="$filters.imageView(item.logo)" width="40" height="40")
            .chat-detail
              p.m-0.text-size-mini {{ item.name }}
        
</template>

<script>
import { reactive, toRefs } from '@nuxtjs/composition-api'
export default {
  props: {
    chats: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const state = reactive({
      chatActive: null,
      list: [
        {
          id: 1,
          name: 'Sana',
          image: 'https://via.placeholder.com/150',
          date: 1614050152,
          lastMessage: 'If you know of a child who is having a greater...',
        },
        {
          id: 2,
          name: 'Mina',
          image: 'https://via.placeholder.com/150',
          date: 1614050152,
          lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 3,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 4,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
          // },
          // {
          //   id: 5,
          //   name: 'Mina',
          //   image: 'https://via.placeholder.com/150',
          //   date: 1614050152,
          //   lastMessage: 'If you know of a child who is having a greater...',
        },
      ],
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.chatList {
  overflow-y: scroll;
  height: calc(100vh - 275px);
}

.listItem {
  cursor: pointer;
  padding: 0.5rem;
  display: block;
  border-bottom: 1px solid #d6d6d6;
  &:hover,
  &.active {
    color: unset;
    background: #eef6fc;
  }
}
</style>
