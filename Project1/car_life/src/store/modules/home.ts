import { getBrandList } from '@/api/home'
import {ActionContext} from 'vuex'
import {IBrandItem} from '@/util/interface'

const state = {
    brandList: {},
    letters: []
}

const mutations = {
    updateBrandList(state: any, payload: IBrandItem[]) {
        let letters: string[] = [];
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
        state.brandList = brandList
        state.letters = letters
    }
}

const actions = {
    async getBrandList({commit}: ActionContext<any, any>) {
        const result = await getBrandList();
        if (result.data) {
            commit('updateBrandList', result.data);
        }
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
