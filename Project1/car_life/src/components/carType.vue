<template>
  <div class="car-type">
    <section class="years" @click="changeYear">
      <span
        v-for="(item, index) in years.slice(1)"
        :key="item"
        :class="{active: curIndex-1===index}"
      >{{item}}</span>
    </section>

    <section>
      <div class="list" v-for="(item, index) in list" :key="index">
        <p>{{index}}</p>
        <ul>
          <li @click="click(value)" v-for="(value, key) in item" :key="key">
            <p>
              <span>{{value.market_attribute.year+'款 '+value.car_name}}</span>
              <span>{{value.market_attribute.dealer_price_min+'起'}}</span>
            </p>
            <p>
              <span>{{value.horse_power+'马力'+value.gear_num+'档'+value.trans_type}}</span>
              <span>{{'指导价'+value.market_attribute.official_refer_price}}</span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";
import useSerial from "../hooks/useSerial";

interface IPorps {
    selectCar: ({}) => void
}

export default defineComponent({
    props: ['selectCar'],
  setup(props: IPorps, context) {
    console.log('props...', props)
    const { list, years, curIndex, changeCurIndex } = useSerial();

    function changeYear({ target }: Event) {
      if ((target as HTMLElement)?.nodeName === "SPAN") {
        const year = (target as HTMLElement)?.innerText;
        changeCurIndex(years.value.findIndex((item) => item === year));
      }
    }

    // 默认选择第一年
    onMounted(() => {
      changeCurIndex(1);
    });

    function click(item: any) {
        props.selectCar(item)
    }

    return {
      list,
      years,
      click,
      curIndex,
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
  background: #fff;
}
.car-type > div {
  width: 100%;
  height: 100%;
}
.years span {
  font-size: 0.32rem;
  padding-right: 0.46rem;
  line-height: 0.77rem;
}
.years .active {
  color: #3aacff;
}
.list > p {
  padding: 0 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.26rem;
  color: #999;
  background: #f4f4f4;
}
.list li {
  padding: 0 0.2rem;
  @include border1px();
  overflow: hidden;
  p {
    @include flex(row, space-between, center);
    padding: 0.15rem 0;
  }
  p:first-child {
    span:first-child {
      font-size: 0.3rem;
      line-height: 1;
      color: #3d3d3d;
    }
    span:last-child {
      font-size: 0.3rem;
      color: #ff2336;
      margin-left: 0.1rem;
    }
  }
  p:nth-child(2) {
    span:first-child {
      color: #bdbdbd;
      font-size: 0.26rem;
    }
    span:last-child {
      font-size: 0.24rem;
      color: #818181;
    }
  }
}
</style>