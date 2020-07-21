<template>
  <div id="app">
    <keep-alive include="phone-urge">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
html{
  font-size: calc(100vw/750*100);
}
body{
  font-size: .16rem;
}
</style>
