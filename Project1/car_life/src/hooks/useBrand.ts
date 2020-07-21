import { reactive, toRefs, UnwrapRef, getCurrentInstance } from '@vue/composition-api'
import {IBrandItem} from '@/util/interface'

interface IData {
    brandList: IBrandItem []
}

export default () => {
    const $store = getCurrentInstance()?.$store;

    const data: UnwrapRef<IData> = reactive({
        brandList: $store?.state.home.brandList,
        letters: $store?.state.home.letters
    })

    function getBrandList() {
        $store?.dispatch('home/getBrandList');
    }

    function getSerialList(id: string) {

    }



    return {
        ...toRefs(data),
        getBrandList
    }
}
