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
    <div
      class="sidebar"
      ref="sidebar"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <li v-for="(item) in letters" :key="item">{{item}}</li>
    </div>

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
    </van-popup> -->
    
    <popup class="car-type" v-if="showSerial">
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

    <!-- 当前触摸的元素 -->
    <span class="fixed" v-show="letter!==-1">{{letters[letter]}}</span>
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

interface IData {
  brandList: IBrandItem[];
  letters: string[];
  letter: number;
  showSerial: boolean;
  // serialList: ISerialItem[]
}

export default defineComponent({
  name: "Home",
  computed: {
    ...mapState({
      serialList: (state: any) => state.home.serialList,
    }),
  },
  components: {
    popup,
  },
  setup(props, { root }) {
    const sidebar = ref();
    const wrap = ref();
    const data: UnwrapRef<IData> = reactive({
      brandList: root.$store?.state.home.brandList,
      letters: root.$store?.state.home.letters,
      // serialList: root.$store?.state.home.serialList,
      letter: -1,
      showSerial: false,
      lockScroll: false,
      overlay: false,
    });

    watch([() => data.letter], ([newVal], [oldVal]) => {
      if (newVal !== -1) {
        let offsetTop = (document.querySelector(
          `#${data.letters[data.letter]}`
        ) as HTMLDivElement)?.offsetTop;
        wrap.value.scrollTop = offsetTop;
      }
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
      let index = Math.floor(
        (pageY - (window.innerHeight - sidebarHeight) / 2) /
          (sidebarHeight / data.letters.length)
      );
      if (index < 0) {
        index = 0;
      }
      if (index > data.letters.length - 1) {
        index = data.letters.length - 1;
      }
      return index;
    }

    function clickBrand(MasterID: number) {
      data.showSerial = true;
      root.$store?.dispatch("home/getSerialList", MasterID);
    }

    return {
      ...toRefs(data),
      sidebar,
      wrap,
      touchStart,
      touchMove,
      touchEnd,
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