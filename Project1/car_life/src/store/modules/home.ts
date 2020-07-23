import { getBrandList } from '@/api/home'
import {ActionContext} from 'vuex'
import {IBrandItem,ISerialItem} from '@/util/interface'
import { getSerialList } from '../../api/home';

const state = {
    brandList: {},
    letters: [],
    serialList: []
}

const mutations = {
    updateBrandList(state: any, payload: IBrandItem[]) {
        let letters = [];
        let brandList:any = {};
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

        state.brandList = {...brandList};
        state.letters = [];
        state.letters.push(...letters);
    },
    updateSerialList(state: any, payload: ISerialItem[] ) {
        state.serialList = payload;
    }
}

const actions = {
    async getBrandList({commit}: ActionContext<any, any>) {
        const result = await getBrandList();
        if (result.data) {
            commit('updateBrandList', result.data);
        }
    },
    async getSerialList({commit}: ActionContext<any, any>, payload: number) {
        const result = await getSerialList(payload);
        if (result.data) {
            commit('updateSerialList', result.data);
        }
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
