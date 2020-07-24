<template>
  <div class="home">
    <!-- 品牌 -->
    <div class="wrap" ref="wrap">
      <div v-for="(item, index) in  brandList" :key="index" :id="index">
        <p>{{index}}</p>
        <ul>
          <li v-for="(value, key) in item" :key="key" @click="clickBrand(value.MasterID)">
            <img :src="value.CoverPhoto" alt />
            <span>{{value.Name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 品牌字母导航 -->
    <letter-nav :letters="letters" @changeLetter="(newLetter)=>letter=newLetter"></letter-nav>

    <!-- 车系列表 -->
    <!-- <van-popup
      class="car-type"
      v-model="showSerial"
      position="right"
      :style="{ width: '75%',height:'100%' }"
    >
      <div v-for="(item) in serialList" :key="item.GroupId">
        <p>{{item.GroupName}}</p>
        <ul>
          <li v-for="(value) in item.GroupList" :key="value.SerialID">
            <img :src="value.Picture" alt />
            <div>
              <p>{{value.AliasName}}</p>
              <p>{{value.DealerPrice}}</p>
            </div>
          </li>
        </ul>
      </div>
    </van-popup>-->

    <popup class="car-type" v-if="showSerial" @close="showSerial=false">
      <div v-for="(item) in serialList" :key="item.GroupId">
        <p>{{item.GroupName}}</p>
        <ul>
          <li v-for="(value) in item.GroupList" :key="value.SerialID">
            <img :src="value.Picture" alt />
            <div>
              <p>{{value.AliasName}}</p>
              <p>{{value.DealerPrice}}</p>
            </div>
          </li>
        </ul>
      </div>
    </popup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  UnwrapRef,
  onMounted,
  ref,
  watch,
  toRefs,
  reactive,
} from "@vue/composition-api";
import { IBrandItem, ISerialItem } from "@/util/interface";
import { mapState } from "vuex";
import popup from "@/components/popup.vue";
import letterNav from "@/components/letterNav.vue";

import useBrand from "@/hooks/useBrand";

export default defineComponent({
  name: "Home",
  components: {
    popup,
    letterNav,
  },
  setup(props, { root }) {
    // 获取wrap dom结点
    const wrap = ref();
    // 获取当前选择的字母
    const letter = ref(-1);
    // 是否显示侧边栏
    const showSerial = ref(false);
    const {
      brandList,
      letters,
      serialList,
      getBrandListAction,
      getSerialListAction,
    } = useBrand();
    // 记录上一次的matserId
    let masterID: number = 0;

    watch([letter], ([newVal], [oldVal]) => {
      if (newVal !== -1) {
        const offsetTop = (document.querySelector(
          `#${letters.value[letter.value]}`
        ) as HTMLDivElement)?.offsetTop;
        wrap.value.scrollTop = offsetTop;
      }
    });

    // 获取品牌数据
    onMounted(() => {
      getBrandListAction();
    });

    function clickBrand(MasterID: number) {
      if (masterID === MasterID) {
        return;
      } else {
        showSerial.value = true;
        getSerialListAction(MasterID);
        masterID = MasterID;
      }
    }

    return {
      brandList,
      letters,
      letter,
      serialList,
      showSerial,
      wrap,
      clickBrand,
    };
  },
});
</script>

<style lang="scss">
@import "../scss/_variable.scss";
@import "../scss/_mixin.scss";

.home {
  height: 100%;
}
.wrap {
  height: 100%;
  overflow-y: scroll;
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

.car-type {
  & > div > p {
    margin-left: 1px;
    font-size: $base-size-m;
    line-height: $base-size-xxxl;
    background: $type-bg-color;
    padding-left: 0.3rem;
    color: $type-title-color;
  }
  ul li {
    height: $type-list-height;
    @include flex(row, flex-start, center);
    @include border1px();
    img {
      margin: 0 0.1rem 0 0.2rem;
      width: 1.8rem;
      height: 1.2rem;
    }
    p:first-child {
      font-size: $base-size-xl;
      color: #5f687a;
    }
    p:last-child {
      margin-top: 0.1rem;
      font-size: $base-size-m;
      color: red;
    }
  }
  ul li:last-child:after {
    border: none;
  }
}
</style>