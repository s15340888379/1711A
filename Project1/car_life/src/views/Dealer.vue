<template>
    <div>
        <section class="header" @click="showSelectCar">
            <img :src="serialDetail.Picture" alt="">
            <div>
                <p>{{serialDetail.AliasName}}</p>
                <p>{{carDetail.car_name}}</p>       
            </div>   
            <span></span>    
        </section>

    <transition name="slideup">
        <car-type v-if="showCarType" :selectCar="selectCar"></car-type>
    </transition>

    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, reactive, toRef, toRefs } from '@vue/composition-api';
import useSerial from '../hooks/useSerial';
import CarType from '@/components/carType.vue'

export default defineComponent({
    components: {
        CarType
    },
    setup(props, {root}) {
        const {$route: {params: {id}}} = root;
        const {getCarDetailAction , carDetail, serialDetail} = useSerial();
        const showCarType: Ref<boolean> = ref(false)
        const data = reactive({
            car: {},

        })

        onMounted(() => {
            getCarDetailAction(id);
        })

        function showSelectCar() {
            showCarType.value = true;
        }

        function selectCar(item: {}) {
            data.car = item;
            showCarType.value = false;
        }

        return {
            ...toRefs(data),
            carDetail,
            serialDetail,
            showSelectCar,
            selectCar,
            showCarType
        }
    }
})
</script>

<style lang="scss" scoped>
    @import "../scss/_mixin.scss";
    .header span{
        @include arrow(right, .3rem, #ccc);
    }
</style>