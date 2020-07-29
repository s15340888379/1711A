<template>
  <router-view></router-view>
</template>


<style lang="scss">
@import './scss/_mixin.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body{
  height: 100%;
}
html{
  font-size: calc(100vw / 750 * 100);
}
body{
  font-size: .16rem;
  // @include grayscale()
}

// 过渡组件样式
.slideup-enter, .slideup-leave-to{
  transform: translateY(100%);
}
.slideup-enter-to, .slideup-leave{
  transform: translateY(0);
}
.slideup-enter-active, .slideup-leave-active{
  transition: transform .3s linear;
}
</style>
