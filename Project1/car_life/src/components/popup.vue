<template>
  <div class="popup"

  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {};

</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100%;
    overflow-y: scroll;
    animation: slidein 0.3s linear;
    background: #fff;
}
@keyframes slidein {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>