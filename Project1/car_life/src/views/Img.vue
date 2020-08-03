<template>
  <div class="wrap">
    <header>
      <span @click="showCarColor=true">{{showColorText}}</span>
      <span>|</span>
      <span @click="showCarType=true">{{showTypeText}}</span>
    </header>
    <section v-if="imgList.length">
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
    <section v-else class="no-content">
      <img src="http://h5.chelun.com/2017/official/img/no-img.png" />
      <span>还没有内容</span>  
    </section> 

    <!-- 车型选择组件 -->
    <transition name="slideup">
      <car-type v-if="showCarType" :selectCar="selectCar">
        <p class="all" @click="selectCar()">全部车款</p>
      </car-type>
    </transition>

    <!-- 颜色选择组件 -->
    <transition name="slideup">
      <color-type v-if="showCarColor" :selectColor="selectColor"></color-type>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "@vue/composition-api";
import CarType from "@/components/carType.vue";
import ColorType from "@/components/colorType.vue";
import useImg from "@/hooks/useImg";

export default defineComponent({
  components: {
    CarType,
    ColorType
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
    const { getImageListAction, setSerialID, imgList, setCarID, setColorID } = useImg();
    setSerialID(id);
    getImageListAction();
    const showCarType: Ref<boolean> = ref(false);
    const showCarColor: Ref<boolean> = ref(false);
    const showTypeText: Ref<string> = ref('车款');
    const showColorText: Ref<string> = ref('全部颜色');

    function selectCar(item: any) {
      showCarType.value = false;
      console.log('item...', item);
      if (item) {
        showTypeText.value = `${item.market_attribute.year}款 ${item.car_name}`
        setCarID(item.car_id);
      } else {
        showTypeText.value = '全部车款';
        setCarID('')
      }
    }

    function selectColor(item: any) {
      showCarColor.value = false;
      if (item) {
        setColorID(item.ColorId);
        showColorText.value = item.Name
      } else {
        setColorID('');
        showColorText.value = '全部颜色'
      }
    }

    return {
      imgList,
      showCarType,
      showCarColor,
      showTypeText,
      showColorText,
      selectCar,
      selectColor,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/_mixin.scss";
.wrap{
  background: #f4f4f4;
  min-height: 100%;
}
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
    width: 40%;
    height: 100%;
    text-align: center;
    line-height: 1.3;
    @include arrow(bottom, 0.2rem, #aaa);
    padding-right: .5rem;
    @include flex(row, center, center);
  }
}
section:nth-child(2){
  padding-top: .8rem;
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
.all{
    margin: .15rem 0;
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
}
.no-content{
  @include flex(column, center, center);
  img{
    margin-top: 1.2rem;
    width: 1.74rem;
  }
  span{
    margin-top: .3rem;
    color: silver;
  }
}
</style>