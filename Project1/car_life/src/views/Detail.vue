<template>
  <div v-if="Object.keys(serialDetail).length">
    <section class="header">
      <div class="img">
        <img :src="serialDetail.CoverPhoto" alt />
        <span>{{serialDetail.pic_group_count}}张照片</span>
      </div>
      <div class="price">
        <p>
          <span>{{serialDetail.market_attribute.dealer_price}}</span>
          <span>{{serialDetail.market_attribute.official_refer_price}}</span>
        </p>
        <router-link tag="button" :to="`/dealer/${serialDetail.list[0].car_id}`">询问底价</router-link>
      </div>
    </section>
    <section class="years" @click="changeYear">
      <span v-for="(item, index) in years" :key="item" :class="{active: curIndex===index}">{{item}}</span>
    </section>

    <section>
      <div class="list" v-for="(item, index) in list" :key="index">
        <p>{{index}}</p>
        <ul>
          <router-link :to="`/dealer/${value.car_id}`" tag="li" v-for="(value, key) in item" :key="key">
            <p>{{value.market_attribute.year+'款 '+value.car_name}}</p>
            <p>{{value.horse_power+'马力'+value.gear_num+'档'+value.trans_type}}</p>
            <p>
              <span>{{'指导价'+value.market_attribute.official_refer_price}}</span>
              <span>{{value.market_attribute.dealer_price_min+'起'}}</span>
            </p>
            <button>询问底价</button>
          </router-link>
        </ul>
      </div>
    </section>

    <router-link tag="section" class="bottom" :to="`/dealer/${serialDetail.list[0].car_id}`">
      <span>询问底价</span>
      <span>本地经销商为你报价</span>  
    </router-link>  
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";
import useSerial from "@/hooks/useSerial";


export default defineComponent({
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
    const { serialDetail, getSerialDetailAction, years, curIndex, list, changeCurIndex } = useSerial();
    //   console.log('context...', id, serialDetail);

    onMounted(() => {
      getSerialDetailAction(Number(id));
    });

    function changeYear({target}: Event) {
      if ((target as HTMLElement)?.nodeName === 'SPAN') {
        const year = (target as HTMLElement)?.innerText;
        changeCurIndex(years.value.findIndex((item) => item === year))
      }
    }

    return {
      serialDetail,
      years,
      curIndex,
      list,
      changeYear
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../scss/_mixin.scss';

    .img{
        position: relative;
        img{
            width: 100%;
        }
        span{
           position: absolute;
            bottom: .3rem;
            right: .3rem;
            color: #fff;
            padding: 1px .1rem;
            border-radius: .2rem;
            background: rgba(0,0,0,.6);
            font-size: .24rem;
        }
    }
    .price{
        p{
            span:nth-child(1){
                font-size: .36rem;
                color: red;
                font-weight: 500;
            }
            span:nth-child(2){
                font-size: .26rem;
                color: silver;
            }
            @include flex(column, flex-start);
        }
        @include flex(row, space-between, center);
        button{
            border-radius: .1rem;
            font-size: .32rem;
            height: .7rem;
            width: 3.45rem;
            border: none;
            box-sizing: border-box;
            background: #00afff;
            color: #fff;
        }
        padding: .36rem .2rem .3rem;
    }
    /deep/ .van-progress__pivot{
        background-color: pink !important; 
    }
    .years span{
      font-size: .32rem;
      padding-right: .46rem;
      line-height: .77rem;
    }
    .years .active{
      color: #3aacff;
    }
    .list>p{
      padding: 0 .2rem;
      height: .5rem;
      line-height: .5rem;
      font-size: .26rem;
      color: #999;
      background: #f4f4f4;
    }
    .list li{
        padding: 0 .2rem;
        @include border1px();
        overflow: hidden;
        p:first-child{
          padding: .26rem 0 .18rem;
          font-size: .3rem;
          line-height: 1;
          color: #3d3d3d;
        }
        p:nth-child(2){
          color: #bdbdbd;
          font-size: .26rem;
        }
        p:nth-child(3){
          text-align: right;
            padding-bottom: .1rem;
            font-size: .24rem;
            color: #818181;
            span:first-child{
              text-align: right;
              padding-bottom: .1rem;
              font-size: .24rem;
              color: #818181;
            }
            span:last-child{
              font-size: .3rem;
              color: #ff2336;
              margin-left: .1rem;
            }
        }
        button{
          border: none;
          border-top: 1px solid #eee;
          @include border1px('top');
          width: 110%;
          height: .8rem;
          font-size: .32rem;
          color: #00afff;
          background: #fff;
          font-weight: 500;
          margin-left: -.3rem;
        }
    }
    .bottom{
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 99;
        background: #3aacff;
        height: 1rem;
        color: #fff;
        @include flex(column, center, center);
        span:first-child{
          font-size: .32rem;
          font-weight: 500; 
        }
        span:last-child{
          margin-top: .12rem;
          font-size: .24rem;
        }
    }
</style>