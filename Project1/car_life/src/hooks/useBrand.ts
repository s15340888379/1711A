import {reactive, UnwrapRef, toRefs} from '@vue/composition-api'
import { IBrandItem, ISerialItem } from '@/util/interface'
import {getBrandList, getSerialList} from '@/api/index'

interface IData {
    brandList: {
        [key: string]: IBrandItem[]
    };
    letters: string[];
    // letter: number;
    // showSerial: boolean;
    serialList: ISerialItem[]
  }
export default () => {
    const data: UnwrapRef<IData> = reactive({
        brandList: {},
        letters: [],
        serialList: []
    })

    async function getBrandListAction() {
        const result: any = await getBrandList();
        if (result.data) {
            updateBrandList(result.data)
        }
    }

    async function getSerialListAction( payload: number) {
        const result: any = await getSerialList(payload);
        if (result.data) {
            updateSerialList(result.data);
        }
    }

    function updateBrandList(payload: IBrandItem[]) {
        let letters = [];
        const brandList: any = {};
        // 通过map拿到每个品牌的首字母
        letters = payload.map((item) => item.Spelling[0]);
        // 去重
        letters = Array.from(new Set(letters))
        payload.forEach((item) => {
            const letter = item.Spelling[0];
            if (brandList[letter]) {
                brandList[letter].push(item);
            } else {
                brandList[letter] = [item];
            }
        })
        data.letters = letters;
        data.brandList = brandList;
    }

    function updateSerialList(payload: ISerialItem[] ) {
        data.serialList = payload;
    }

    return {
        ...toRefs(data),
        getBrandListAction,
        getSerialListAction
    }
}
