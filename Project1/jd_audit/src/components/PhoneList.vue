<template>
  <div>
    <li v-for="(item, index) in list" :key="index">
      <p>{{`${item.name} ${item.sex}`}}</p>
      <p>{{`案件编号: ${item.case_id}`}}</p>
      <p>
        <span>产品类型</span>
        <span>{{item.type}}</span>
        <a :href="`tel:+${item.phone}`" @click="click(item.phone)">联系客户</a>
      </p>
    </li>
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: ()=>([])
        },
        dailPhone: {
            type: Function,
            default: ()=>{}
        }
    },
    methods: {
        click(phone){
            this.$emit('dailPhone', phone)
        }
    }
};
</script>

