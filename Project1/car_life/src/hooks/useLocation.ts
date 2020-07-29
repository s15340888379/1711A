import { reactive, toRefs, onMounted } from '@vue/composition-api'
import { getLocation, getCityList } from '@/api/index'


export default () => {
    const data = reactive({
        provinceList: [],
        cityList: [],
        current: {}
    })

    onMounted(() => {
        getLocationAction();
    })

    async function getLocationAction() {
        const result = await getLocation();
        if (result.data) {
            data.current = result.data;
        }
    }

    async function getCityListAction(provinceid?: number) {
        const result = await getCityList(provinceid);
        if (result.data) {
            if (!provinceid) {
                data.provinceList = result.data;
            } else {
                data.cityList = result.data;
            }
        }

    }

    return {
        ...toRefs(data),
        getLocationAction,
        getCityListAction
    }
}
