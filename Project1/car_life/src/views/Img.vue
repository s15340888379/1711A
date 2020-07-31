<template>
  <div>
    <header>
      <span @click="showCarColor=true">{{'颜色'}}</span>
      <span>|</span>
      <span @click="showCarType=true">{{'车型'}}</span>
    </header>
    <section>
      <ul v-for="(item) in imgList" :key="item.Id">
        <li
          v-for="(value, key) in item.List"
          :key="value.Url"
          :style="{backgroundImage: `url(${value.Url.replace('{0}', value.LowSize)})`}"
        >
          <p v-if="!key">
            <span>{{item.Name}}</span>
            <span>{{item.Count}}张></span>
          </p>
        </li>
      </ul>
    </section>

    <!-- 车型选择组件 -->
    <transition name="slideup">
      <car-type v-if="showCarType" :selectCar="selectCar"></car-type>
    </transition>

    <!-- 颜色选择组件 -->
    <transition name="slideup">
      <car-type v-if="showCarColor" :selectCar="selectCar"></car-type>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "@vue/composition-api";
import CarType from "@/components/carType.vue";
import useImg from "@/hooks/useImg";

export default defineComponent({
  components: {
    CarType,
  },
  setup(
    props,
    {
      root: {
        $route: {
          params: { id },
        },
      },
    }
  ) {
    const { getImageListAction, setSerialID, imgList } = useImg();
    setSerialID(id);
    getImageListAction();
    const showCarType: Ref<boolean> = ref(false);
    const showCarColor: Ref<boolean> = ref(false);

    function showSelectCar() {}

    function showSelectColor() {}

    return {
      imgList,
      showCarType,
      showCarColor,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/_mixin.scss";

header {
  position: fixed;
  background: #fff;
  top: 0;
  width: 100%;
  height: 0.8rem;
  z-index: 99;
  @include flex(row, space-between, center);
  span:first-child,
  span:last-child {
    width: 48%;
    height: 100%;
    line-height: 0.8rem;
    text-align: center;
    @include arrow(bottom, 0.3rem, #ccc);
  }
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.06rem;
  p {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(81, 56, 130, 0.5);
    @include flex(column, center, center);
    span:first-child {
      font-size: 0.28rem;
      color: #fff;
    }
    span:last-child {
      font-size: 0.26rem;
      color: #fff;
      margin-top: 0.12rem;
    }
  }
}
li {
  position: relative;
  width: 2.46rem;
  height: 2.46rem;
  padding: 0;
  background-size: cover;
  background-position: center;
  margin-top: 0.06rem;
}
</style>