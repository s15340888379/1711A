<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from '@vue/composition-api'
import {getBrandList} from '@/api/index'

export default defineComponent({
  name: 'App',
  setup(){
    onMounted(async ()=>{
      let data = await getBrandList();
      console.log('data...', data);
    })
  }
});
</script>

<style lang="scss">
@import './scss/_mixin.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html{
  font-size: calc(100vw / 750 * 100);
}
body{
  font-size: .16rem;
  // @include grayscale()
}
</style>
