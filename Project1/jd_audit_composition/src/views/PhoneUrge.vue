<template>
  <div>
    <van-tabs v-model="active" animated>
      <van-tab title="待跟进(19)">
        <phone-list :list="finished" @dailPhone="dailPhone" />
      </van-tab>
      <van-tab title="已跟进">
        <phone-list :list="unfinished" :dailPhone="dailPhone" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PhoneList from '@/components/PhoneList'
import { defineComponent } from '@vue/composition-api'
import usePhoneUrge from '@/hooks/usePhoneUrge.js'

export default defineComponent({
  name: 'phone-urge',
  components: {
    PhoneList
  },

  setup (props, context) {
    return usePhoneUrge(context)
  }
})
</script>
