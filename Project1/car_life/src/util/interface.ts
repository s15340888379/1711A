// 品牌数据
export interface IBrandItem {
    CoverPhoto: string,
    MasterID: string,
    Name: string,
    Spelling: string,
    newTags: string[],
    tagurl: string
}

export interface ISerialItem {
    GroupId: string,
    GroupName: string,
    GroupList: Array<{
        AliasName: string,
        CoverPhoto: string,
        DealerPrice: string,
        FullSpelling: string,
        Level: string,
        Picture: string,
        SerialID: string,
        Spelling: string,
        newTags: string [],
        orderCount: number,
        tags: string [],
        tagurl: string
    }>
}
