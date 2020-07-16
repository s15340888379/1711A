<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/main/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/main/my" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>