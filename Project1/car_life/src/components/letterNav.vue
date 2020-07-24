<template>
  <div>
    <div
      class="sidebar"
      ref="sidebar"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <li v-for="(item) in letters" :key="item">{{item}}</li>
    </div>
    <!-- 当前触摸的元素 -->
    <span class="fixed" v-show="letter!==-1">{{letters[letter]}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import useBrand from "@/hooks/useBrand";

export default defineComponent({
  props: ["letters"],
  setup(props, { emit }) {
    // 获取sidebar dom结点
    const sidebar = ref();
    // 获取当前选择的字母
    const letter = ref(-1);

    function touchStart({ touches }: TouchEvent) {
      const { pageY } = touches[0];
      const pos = getPosition(pageY);
      letter.value = pos;
      emit("changeLetter", pos);
    }

    function touchMove({ touches }: TouchEvent) {
      const { pageY } = touches[0];
      const pos = getPosition(pageY);
      letter.value = pos;
      emit("changeLetter", pos);
    }

    function touchEnd(e: TouchEvent) {
      letter.value = -1;
      emit("changeLetter", -1);
    }

    function getPosition(pageY: number) {
      const sidebarHeight = sidebar.value?.clientHeight;
      let index = Math.floor(
        (pageY - (window.innerHeight - sidebarHeight) / 2) /
          (sidebarHeight / props.letters.length)
      );
      if (index < 0) {
        index = 0;
      }
      if (index > props.letters.length - 1) {
        index = props.letters.length - 1;
      }
      return index;
    }

    return {
      sidebar,
      letter,
      touchStart,
      touchMove,
      touchEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/_variable.scss";

.sidebar {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  li {
    font-size: $base-size-s;
    color: $letter-list-color;
    font-weight: 500;
    padding: 0.02rem 0.1rem 0.1rem 0.3rem;
  }
}

.fixed {
  font-size: $base-size-xxl;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  color: #fff;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0.1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>