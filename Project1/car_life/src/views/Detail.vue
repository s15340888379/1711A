<template>
</template>

<script lang="ts">
import {defineComponent, onMounted} from '@vue/composition-api'
import useSerial from '@/hooks/useSerial'

export default defineComponent({
  setup(props, {root: {$route: {params: {id}}}}) {

      const {serialDetail, getSerialDetailAction} = useSerial();
    //   console.log('context...', id, serialDetail);

      onMounted(() => {
          getSerialDetailAction(Number(id))
      })

      return {
          serialDetail
      }
  }
})
</script>