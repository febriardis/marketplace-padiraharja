<template lang="pug">
    .skeleton-load(:style="{ width: width, height: height }")
</template>

<script>
export default {
  name: 'FSkeleton',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '20px',
    },
  },
}
</script>

<style lang="scss">
/* The skeleton-load Class */
.skeleton-load {
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background-color: #e2e2e2;
}

/* The moving element */
.skeleton-load::after {
  display: block;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.3),
    hsla(0, 0%, 100%, 0)
  );

  /* Adding animation */
  animation: load 1.2s infinite;
}

/* skeleton-load Animation */
@keyframes load {
  100% {
    transform: translateX(100%);
  }
}
</style>
