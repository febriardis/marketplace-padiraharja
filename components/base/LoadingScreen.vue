<template lang="pug">
    .loading-screen
        .text-center
            i.el-icon-loading
            p.mt-1 loading...
</template>

<style lang="scss">
.loading-screen {
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
