<template>
    <div>
        <van-tabs v-model="active" animated>
            <van-tab title="待跟进(19)">
                内容 {{ index }}
            </van-tab>
            <van-tab title="已跟进">
                内容 {{ index }}
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
