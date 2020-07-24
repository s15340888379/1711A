<template>
  <div class="popup"
    ref="wrap"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref, reactive, UnwrapRef} from '@vue/composition-api'
export default defineComponent({
  name: "Popup",
  setup(props, {emit}) {
    const wrap: Ref = ref()
    const data: UnwrapRef<{
      prePos: Touch | {},
      curPos: Touch | {},
      preTransformX: number
    }> = reactive({
      prePos: {},
      curPos: {},
      preTransformX: 0
    })
    function touchStart({touches}: TouchEvent) {
      data.prePos = touches[0]
    }

    function touchMove({touches}: TouchEvent) {
      data.curPos = touches[0];
      let deltaPageX = (data.curPos as Touch).pageX - (data.prePos as Touch).pageX;
      const deltaPageY = (data.curPos as Touch).pageY - (data.prePos as Touch).pageY;
      if (Math.abs(deltaPageY) > Math.abs(deltaPageX)) {
        return;
      }

      deltaPageX += data.preTransformX;
      if (deltaPageX < 0) {
        deltaPageX = 0;
      }
      (wrap.value as HTMLDivElement).style.transform = `translateX(${deltaPageX}px)`;
    }

    function touchEnd() {
      const deltaPageX = (data.curPos as Touch).pageX - (data.prePos as Touch).pageX + data.preTransformX;
      // 当滚动距离大于页面三分之一时关闭
      if (deltaPageX > window.innerWidth * 0.3) {
        (wrap.value as HTMLDivElement).style.transform = `translateX(${window.innerWidth * 0.7}px)`;
        emit('close');
      } else {
        (wrap.value as HTMLDivElement).style.transform = `translateX(0px)`;
      }
      // 记录上一次滚动的结束位置
      // const str:string = (wrap.value as HTMLDivElement).style.transform;
      // data.preTransformX = Number(str.slice(11, -3));
    }

    return {
      wrap,
      touchStart,
      touchMove,
      touchEnd
    }
  }
});
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