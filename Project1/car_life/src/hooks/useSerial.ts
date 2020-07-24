import { reactive, toRefs } from '@vue/composition-api'
import { getSerialDetail } from '../api/detail';

export default () => {
    const data = reactive({
        serialDetail: {

        }
    })

    async function getSerialDetailAction(SerialId: number) {
        const result = await getSerialDetail(SerialId)
        if (result.data) {
            data.serialDetail = result.data
        }
    }

    return {
        ...toRefs(data),
        getSerialDetailAction
    }
}

