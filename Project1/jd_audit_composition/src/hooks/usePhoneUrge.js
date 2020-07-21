import { ref, reactive, toRefs, onMounted, computed, watch } from '@vue/composition-api'

export default (context) => {
  const active = ref(0)
  const data = reactive({
    list: [],
    finished: computed(() => {
      return data.list.filter(item => item.finished)
    }),
    unfinished: computed(() => {
      return data.list.filter(item => !item.finished)
    })
  })

  // 发起网络请求
  onMounted(async () => {
    console.log('context...', context)
    const result = await context.root.$axios.get('/phone/list')
    console.log('result...', result)
    data.list = result.list
  })

  watch(active, function () {
    console.log('arguments...', arguments)
  })

  function dailPhone (phone) {
    console.log('dail phone...', phone)
  }

  return {
    ...toRefs(data),
    active,
    dailPhone
  }
}
