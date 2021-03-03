<template lang="pug">
    .show-on-mobile
        .bottom-navigation
            button.nav(
              type="button" 
              v-for="(item, key) in menus"
              @click="$router.push({path: item.router})" 
              :class="{ 'active' : item.isActive }")
                i.fas(:class="item.icon")
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          router: '/',
          isActive: false,
          icon: 'fa-home',
        },
        {
          router: '/news',
          isActive: false,
          icon: 'fa-clipboard-list',
        },
        {
          router: '/cart',
          isActive: false,
          icon: 'fa-shopping-cart',
        },
        {
          router: '/account',
          isActive: false,
          icon: 'fa-user-circle',
        },
      ],
    }
  },

  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(value) {
        const routePath = value.path
        this.menus.forEach((element) => {
          if (element.router === routePath) {
            element.isActive = true
          }
        })
      },
    },
  },
}
</script>

<style lang="scss">
.bottom-navigation {
  border-top: 1px solid #bbbbbb;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  .nav {
    flex-basis: 25%;
    padding: 15px 10px;
    font-size: 20px;
    background: #ffffff;
    border: none;
    &.active,
    &:hover,
    &:focus {
      color: #d60b0b;
      border: unset;
      outline: none;
    }
  }
}
</style>
