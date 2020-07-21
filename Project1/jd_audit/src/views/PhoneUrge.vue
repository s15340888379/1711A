<template>
    <div>
        <van-tabs v-model="active" animated>
            <van-tab title="待跟进(19)">
                <phone-list :list="finished" @dailPhone="dailPhone"/>
            </van-tab>
            <van-tab title="已跟进">
                <phone-list :list="unfinished" :dailPhone="dailPhone"/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import PhoneList from '@/components/PhoneList'

export default {
    name: 'phone-urge',
    components: {
        PhoneList
    },
    data(){
        return {
            active: 0,
            list: []
        }
    },
    methods: {
        dailPhone(phone){
            console.log('dail phone...', phone)
        }
    },
    computed: {
        finished(){
            return this.list.filter(item=>item.finished)
        },
        unfinished(){
            return this.list.filter(item=>!item.finished)
        }
    },
    watch: {
        active:function (newVal, oldVal){
            console.log('arguments...', arguments, newVal, oldVal)
        }
    },
    beforeCreate(){

    },
    async created(){
        let result = await this.$axios.get('/phone/list')
        console.log('result...', result);
        this.list = result.list;
    },
    beforeMount(){

    },
    mounted(){
        console.log('mounted', a)
    },
    beforeUpdate(){

    },
    updated(){

    },
    beforeDestroy(){

    },
    destroyed(){

    },
    activated(){
        console.log('activated...')
    },
    deactivated(){
        console.log('deactivated...')
    }
}
</script>