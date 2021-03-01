<template lang="pug">
    .show-on-mobile
        .bottom-navigation
            button.nav(type="button")
                i.fas.fa-home
            button.nav(type="button")
                i.fas.fa-clipboard-list
            button.nav(type="button")
                i.fas.fa-shopping-cart
            button.nav(type="button")
                i.fas.fa-user-circle
</template>

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
