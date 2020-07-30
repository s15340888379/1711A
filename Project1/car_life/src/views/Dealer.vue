<template>
  <div>
    <header>
      <p>可向多个商家咨询最低价，商家及时回复</p>
      <img src="//h5.chelun.com/2017/official/img/icon-help.png" />
    </header>
    <section class="header" @click="showSelectCar">
      <img :src="serialDetail.Picture" alt />
      <div>
        <p>{{car.AliasName?car.AliasName: serialDetail.AliasName}}</p>
        <p>{{car.car_name?car.car_name: carDetail.car_name}}</p>
      </div>
      <span></span>
    </section>

    <section>
      <button @click="showLocation=true">{{city.CityName?city.CityName: '北京'}}</button>
    </section>

    <section>
      <p>选择报价经销</p>
    </section>

    <!-- 车型选择组件 -->
    <transition name="slideup">
      <car-type v-if="showCarType" :selectCar="selectCar"></car-type>
    </transition>

    <!-- 城市选择组件 -->
    <transition name="slideup">
      <location v-if="showLocation" @select="selectCity"></location>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  Ref,
  reactive,
  toRef,
  toRefs,
  watch,
} from "@vue/composition-api";
import useSerial from "@/hooks/useSerial";
import useLocation from "@/hooks/useLocation";
import useDealer from "@/hooks/useDealer";

import CarType from "@/components/carType.vue";
import Location from "@/components/location.vue";

export default defineComponent({
  components: {
    CarType,
    Location,
  },
  setup(props, { root }) {
    const {
      $route: {
        params: { id },
      },
    } = root;
    // 获取车系数据
    const { getCarDetailAction, carDetail, serialDetail } = useSerial();
    // 获取定位
    const { getLocationAction, current } = useLocation();
    const showCarType: Ref<boolean> = ref(false);
    const showLocation: Ref<boolean> = ref(false);
    const data = reactive({
      car: carDetail,
      city: current,
    });
    // 获取经销商列表
    const { getDealerListAction } = useDealer();

    onMounted(async () => {
      await getCarDetailAction(id);
      await getLocationAction();
      getDealerListAction((data.car as any).car_id, (data.city as any).CityID);
    });

    // 实时获取经销商的列表
    watch([() => data.car, () => data.city], () => {
      getDealerListAction((data.car as any).car_id, (data.city as any).CityID);
    });

    function showSelectCar() {
      showCarType.value = true;
    }

    function selectCar(item: any) {
      showCarType.value = false;

      if (item.car_id === (data.car as any).car_id) {
        return;
      }
      data.car = item;
    }

    function selectCity(city: any) {
        showLocation.value = false;
        if (city.CityID === (data.city as any).CityID) {
        return;
      }
        data.city = city;

    }

    return {
      ...toRefs(data),
      carDetail,
      serialDetail,
      showSelectCar,
      selectCar,
      selectCity,
      showCarType,
      showLocation,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/_mixin.scss";
.header img {
  width: 2.3rem;
  height: 1.41rem;
  border: 1px solid #eee;
  box-sizing: border-box;
  border-radius: 5px;
}
.header {
  @include flex(row, space-between, center);
  span {
    @include arrow(right, 0.3rem, #ccc);
  }
  p:first-child {
    font-size: 0.36rem;
  }
  p:last-child {
    font-size: 0.32rem;
  }
}
</style>