import {reactive, UnwrapRef, toRefs} from '@vue/composition-api'
import { IBrandItem, ISerialItem } from '@/util/interface'
import {getDealerList} from '@/api/index'

export default () => {
    const data = reactive({
        dealerList: []
    })

    async function getDealerListAction(carId: string, cityId: string) {
        const result: any = await getDealerList(carId, cityId);
        // if (result.data) {

        // }
    }


    return {
        ...toRefs(data),
        getDealerListAction
    }
}
