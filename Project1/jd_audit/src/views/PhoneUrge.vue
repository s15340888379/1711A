<template>
    <div>
        <van-tabs v-model="active" animated>
            <van-tab title="待跟进(19)">
                <li v-for="(item, index) in list" :key="index">
                    <p>{{`${item.name}  ${item.sex}`}}</p>
                    <p>{{`案件编号: ${item.case_id}`}}</p>
                    <p>
                        <span>产品类型</span>
                        <span>{{item.type}}</span>    
                        <a :href="`tel:+${item.phone}`">联系客户</a>
                    </p>   
                </li>
            </van-tab>
            <van-tab title="已跟进">
                 <li v-for="(item, index) in list" :key="index">
                    <p>{{`${item.name}  ${item.sex}`}}</p>
                    <p>{{`案件编号: ${item.case_id}`}}</p>
                    <p>
                        <span>产品类型</span>
                        <span>{{item.type}}</span>    
                        <a :href="`tel:+${item.phone}`">联系客户</a>
                    </p>   
                </li>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active: 0,
            list: [{
                case_id: 'case_zc_A1912200019',
                name: '马蕴涛',
                sex: '男',
                type: '12-JDBT',
                phone: '13133809344'
            },{
                case_id: 'case_zc_A1912200019',
                name: '马蕴涛',
                sex: '男',
                type: '12-JDBT',
                phone: '13133809344'
            },{
                case_id: 'case_zc_A1912200019',
                name: '马蕴涛',
                sex: '男',
                type: '12-JDBT',
                phone: '13133809344'
            },{
                case_id: 'case_zc_A1912200019',
                name: '马蕴涛',
                sex: '男',
                type: '12-JDBT',
                phone: '13133809344'
            },{
                case_id: 'case_zc_A1912200019',
                name: '马蕴涛',
                sex: '男',
                type: '12-JDBT',
                phone: '13133809344'
            }]
        }
    }
}
</script>