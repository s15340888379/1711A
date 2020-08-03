<template>
  <div class="car-type">
    <p class="all" @click="selectColor()">全部颜色</p>
    <section class="years" @click="changeYear">
      <span v-for="(item, index) in years" :key="item" :class="{active: curIndex===index}">{{item}}</span>
    </section>

    <section class="list">
      <li v-for="(item, index) in colorList[years[curIndex]]" :key="index" @click="selectColor(item)">
        <span :style="{backgroundColor: `${item.Value}`}"></span>
        <span>{{item.Name}}</span>
      </li>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
} from "@vue/composition-api";
import useImg from "../hooks/useImg";

interface IPorps {
  selectColor: ({}) => void;
}

export default defineComponent({
  props: ["selectColor"],
  setup(
    props: IPorps,
    {
      root: {
        $route: {
          params: { id },
        },
      },
    }
  ) {
    const { colorList, getModelImageYearColorAction } = useImg();
    const curIndex = ref(0);
    const years = computed(() => {
      // console.log('years...', colorList, Object.keys(colorList.value))
      return Object.keys(colorList.value).sort((a, b) => Number(b) - Number(a));
    });

    function changeYear({ target }: Event) {
      if ((target as HTMLElement)?.nodeName === "SPAN") {
        const year = (target as HTMLElement)?.innerText;
        curIndex.value = years.value.findIndex((item) => item === year);
      }
    }

    onMounted(() => {
      getModelImageYearColorAction(id);
    });

    function click(item: any) {
      props.selectColor(item);
    }

    return {
      years,
      curIndex,
      colorList,
      changeYear,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/_mixin.scss";

.car-type {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: #f4f4f4;
  z-index: 1000;
}
.all{
    margin: .15rem 0;
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
}
.car-type > div {
  width: 100%;
  height: 100%;
}
.years {
  width: 100%;
  overflow-x: scroll;
  margin: 0.15rem 0;
  background: #fff;
}
.years span {
  font-size: 0.32rem;
  padding-right: 0.46rem;
  line-height: 0.77rem;
}
.years .active {
  color: #3aacff;
}
.list {
  @include flex(row, flex-start, center);
  flex-wrap: wrap;
  background: #fff;
}
.list li {
  width: 3.45rem;
  font-size: 0.32rem;
  line-height: 0.68rem;
  border: 1px solid #3aacff;
  box-sizing: border-box;
  margin: 0.2rem 0 0.2rem 0.2rem;
  border-radius: 0.05rem;
  @include flex(row, flex-start, center);
  span:first-child {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin: 0 0.2rem;
    background: #fe9210;
    box-sizing: border-box;
    border: 1px solid #818181;
  }
}
</style>