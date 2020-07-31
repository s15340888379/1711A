import { reactive, toRefs } from '@vue/composition-api'
import { getImageList } from '@/api';

export default () => {
    const data = reactive({
        SerialID: '',
        CarId: '',
        ColorID: '',
        img_id: '',
        colorList: [],
        imgList: [],
        categoryImgList: [],
        page: 0,
        pageSize: 30
    })

    function setSerialID(SerialID: string) {
        data.SerialID = SerialID;
    }

    async function getImageListAction() {
        const params: any = {SerialID: data.SerialID};
        if (data.CarId) {
            params.CarId = data.CarId;
        }
        if (data.ColorID) {
            params.ColorID = data.ColorID;
        }
        const result = await getImageList(params);
        if (result.data) {
            data.imgList = result.data;
        }
    }

    return {
        ...toRefs(data),
        setSerialID,
        getImageListAction
    }
}
