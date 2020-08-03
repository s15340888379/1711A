import { reactive, toRefs, computed, UnwrapRef, watch, onMounted } from '@vue/composition-api'
import { getSerialDetail } from '../api/index';

interface IData {
    serialDetail: {
        [key: string]: any
    },
    years: string[],
    curIndex: number,
    carDetail: {}
}
export default () => {
    const serialData = window.sessionStorage.getItem('serialData');
    const data: UnwrapRef<IData> = reactive({
        serialDetail: {},
        years: ["全部"],
        curIndex: 0,
        carDetail: {}
    })
    const list = computed(() => {
        const curYear = data.years[data.curIndex];
        if (!data.serialDetail.list) {
            return {};
        }
        let list = data.serialDetail.list;
        if (curYear !== '全部') {
            list = list.filter((item: any) => item.market_attribute.year === curYear);
        }
        list = sortSerialList(list);
        return mergeSerialList(list)
    })

    onMounted(() => {
        if (serialData) {
            data.serialDetail = JSON.parse(serialData);
        }
    })

    watch([() => data.serialDetail], () => {
        if (data.serialDetail.list) {
            const years = data.serialDetail.list.map((item: any) => item.market_attribute.year);
            years.sort((a: string, b: string) => Number(b) - Number(a));
            data.years = ["全部"].concat(Array.from(new Set(years)));
        }
    })

    function changeCurIndex(index: number) {
        data.curIndex = index;
    }

    async function getSerialDetailAction(SerialId: number) {
        const result = await getSerialDetail(SerialId)
        if (result.data) {
            data.serialDetail = result.data
            window.sessionStorage.setItem('serialData', JSON.stringify(result.data));
        }
    }

    function getCarDetailAction(carId: string) {
        data.carDetail = data.serialDetail.list.filter((item: any) => item.car_id === carId)[0]
    }

    function sortSerialList(list: any[]) {
        return list.sort((a, b) => {
            // 先按马力升序
            if (a.exhaust === b.exhaust) {
                // 如果相等，再按功率进行排序
                if (a.max_power === b.max_power) {
                    // 如果相等，再按吸气方式进行排序
                    if (a.inhale_type > b.inhale_type) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    return a.max_power - b.max_power
                }
            } else {
                return a.exhuast - b.exhaust
            }
        })
    }

    function mergeSerialList(list: any[]) {
        const obj: {[key: string]: any []} = {};
        list.forEach((item) => {
            const key = `${item.exhaust_str}/${item.max_power_str} ${item.inhale_type}`;
            if (obj[key]) {
                obj[key].push(item);
            } else {
                obj[key] = [item]
            }
        })
        return obj;
    }

    return {
        ...toRefs(data),
        list,
        changeCurIndex,
        getSerialDetailAction,
        getCarDetailAction
    }
}

