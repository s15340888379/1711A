<template>
  <div class="home">
    <!-- 品牌 -->
    <div class="wrap">
      <div v-for="(item, index) in  brandList" :key="index">
        <p>{{index}}</p>
        <ul>
          <li v-for="(value, key) in item" :key="key">
            <img :src="value.CoverPhoto" alt />
            <span>{{value.Name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 品牌字母导航 -->
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
    <span class="fixed">{{letters[letter]}}</span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  UnwrapRef,
  onMounted,
  ref,
  toRefs,
  reactive
} from "@vue/composition-api";
// import useBrand from "@/hooks/useBrand";
import { IBrandItem } from "@/util/interface";

interface IData {
  brandList: IBrandItem[];
  letters: string[];
  letter: number;
}

export default defineComponent({
  name: "Home",
  setup(props, { root }) {
    const sidebar = ref();
    const data: UnwrapRef<IData> = reactive({
      brandList: root.$store?.state.home.brandList,
      letters: root.$store?.state.home.letters,
      letter: -1
    });

    function getBrandList() {
      root.$store?.dispatch("home/getBrandList");
    }

    onMounted(() => {
      getBrandList();
    });

    function touchStart({ touches }: TouchEvent) {
      let { pageY } = touches[0];
      let pos = getPosition(pageY);
      data.letter = pos;
    }

    function touchMove({ touches }: TouchEvent) {
      let { pageY } = touches[0];
      let pos = getPosition(pageY);
      data.letter = pos;
    }

    function touchEnd(e: TouchEvent) {
      data.letter = -1;
    }

    function getPosition(pageY: number) {
      let sidebarHeight = sidebar.value?.clientHeight;
      return Math.floor(
        (pageY - (window.innerHeight - sidebarHeight) / 2) /
          (sidebarHeight / data.letters.length)
      );
    }

    return {
      ...toRefs(data),
      sidebar,
      touchStart,
      touchMove,
      touchEnd
    };
  }
});
</script>

<style lang="scss">
@import "../scss/_variable.scss";
@import "../scss/_mixin.scss";

.wrap {
  p {
    height: $letter-height;
    color: $letter-list-color;
    font-size: $base-size-m;
    background: $letter-bg-color;
    padding-left: 0.3rem;
    line-height: 1.5;
  }
  ul {
    margin: 0 0.3rem;
  }
  li {
    height: $brand-list-height;
    @include flex(row, flex-start, center);
    @include border1px();
    img {
      height: 0.8rem;
    }
    span {
      font-size: $base-size-l;
      margin-left: 0.4rem;
    }
  }
  li:last-child:after {
    display: none;
  }
}

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
.fixed{
  font-size: $base-size-xxl;
  width: 1rem;
  height: 1rem;
  text-align: center;
  background: rgba(0,0,0,.6);
  border-radius: .1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>