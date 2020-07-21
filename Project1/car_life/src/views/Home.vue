<template>
  <div class="home">
    <!-- 品牌 -->
    <div>
      <div v-for="(item, index) in  brandList" :key="index">
        <p>{{index}}</p>
        <ul>
          <li v-for="(value, key) in item" :key="key">
            <img :src="value.CoverPhoto" alt="">
            <span>{{value.Name}}</span>  
          </li>  
        </ul> 
      </div>  
    </div>

    <!-- 品牌字母导航 -->
    <div>
      <li v-for="(item) in letters" :key="item">{{item}}</li>  
    </div>  
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api';
import useBrand from '@/hooks/useBrand'

export default defineComponent({
  name: 'Home',
  setup() {
    const {brandList, letters, getBrandList} = useBrand();

    onMounted(() => {
      getBrandList()
    })

    return {
      brandList,
      letters
    }
  }
})
</script>
