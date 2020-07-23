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
</style>
